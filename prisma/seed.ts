import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const profileSlug = 'vladislav-pavlenko';

  console.log(`Starting idempotent database seed for profile: "${profileSlug}"...`);

  // 1. Find or create profile record
  const profile = await prisma.profile.upsert({
    where: { slug: profileSlug },
    update: {
      name: 'Владислав Павленко',
      description:
        'Full-Stack / Backend Developer (Node.js, TypeScript, NestJS, React, Next.js). Специализируюсь на проектировании масштабируемых REST и GraphQL API, создании Telegram Mini Apps и интеграции LLM-решений.',
    },
    create: {
      slug: profileSlug,
      name: 'Владислав Павленко',
      description:
        'Full-Stack / Backend Developer (Node.js, TypeScript, NestJS, React, Next.js). Специализируюсь на проектировании масштабируемых REST и GraphQL API, создании Telegram Mini Apps и интеграции LLM-решений.',
    },
  });

  // 2. Atomically update all child records in a single batch transaction
  await prisma.$transaction([
    prisma.socialLink.deleteMany({
      where: { profileId: profile.id },
    }),
    prisma.skill.deleteMany({
      where: { profileId: profile.id },
    }),
    prisma.experience.deleteMany({
      where: { profileId: profile.id },
    }),
    prisma.project.deleteMany({
      where: { profileId: profile.id },
    }),
    prisma.socialLink.createMany({
      data: [
        {
          profileId: profile.id,
          platform: 'GitHub',
          url: 'https://github.com/JamsenUP',
        },
        {
          profileId: profile.id,
          platform: 'Portfolio',
          url: 'https://jamsen.vercel.app',
        },
        {
          profileId: profile.id,
          platform: 'Telegram',
          url: 'https://t.me/jamsenbang',
        },
      ],
    }),
    prisma.skill.createMany({
      data: [
        {
          profileId: profile.id,
          name: 'TypeScript',
          category: 'Languages & Runtimes',
        },
        {
          profileId: profile.id,
          name: 'Node.js',
          category: 'Languages & Runtimes',
        },
        {
          profileId: profile.id,
          name: 'NestJS',
          category: 'Backend Frameworks',
        },
        {
          profileId: profile.id,
          name: 'GraphQL (Apollo)',
          category: 'API Architecture',
        },
        {
          profileId: profile.id,
          name: 'Prisma ORM',
          category: 'Databases & ORM',
        },
        {
          profileId: profile.id,
          name: 'PostgreSQL',
          category: 'Databases & ORM',
        },
        {
          profileId: profile.id,
          name: 'Docker',
          category: 'DevOps & Containers',
        },
        {
          profileId: profile.id,
          name: 'Next.js / React',
          category: 'Frontend',
        },
        {
          profileId: profile.id,
          name: 'REST API',
          category: 'API Architecture',
        },
        {
          profileId: profile.id,
          name: 'LLM API Integration (OpenAI / Claude / Gemini)',
          category: 'AI & Automation',
        },
      ],
    }),
    prisma.experience.createMany({
      data: [
        {
          profileId: profile.id,
          company: 'Freelance / Проектная разработка',
          position: 'Full-Stack Web Developer',
          period: '2024 — Настоящее время',
          achievements: [
            'Разработал и оптимизировал веб-приложение аналитики цен Omniprice Radar с интеграцией внешнего API маркетплейсов',
            'Спроектировал и запустил Telegram Mini App (Scalemate) с реактивным интерфейсом и бэкенд-логикой',
            'Внедрил автоматизацию бизнес-процессов и AI-ассистентов на базе LLM API для коммерческих клиентов',
          ],
        },
      ],
    }),
    prisma.project.createMany({
      data: [
        {
          profileId: profile.id,
          name: 'Omniprice Radar',
          description:
            'Веб-приложение для мониторинга и аналитики цен на базе API Wildberries',
          url: 'https://omniprice-radar.vercel.app',
        },
        {
          profileId: profile.id,
          name: 'Scalemate TMA',
          description: 'Telegram Mini App бот и веб-интерфейс',
          url: 'https://t.me/scalemate_test_bot',
        },
        {
          profileId: profile.id,
          name: 'Horizon',
          description:
            'Веб-приложение платформы недвижимости с интерактивным каталогом',
          url: 'https://horizon-estate-six.vercel.app/',
        },
        {
          profileId: profile.id,
          name: 'Personal Portfolio',
          description:
            'Интерактивное портфолио разработчика с оптимизированным рендерингом',
          url: 'https://jamsen.vercel.app',
        },
      ],
    }),
  ]);

  console.log(
    `Database successfully seeded for profile ID: ${profile.id} (slug: ${profile.slug})`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error('Error during database seed execution:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
