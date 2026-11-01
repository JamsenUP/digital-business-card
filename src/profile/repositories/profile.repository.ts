import { Injectable } from '@nestjs/common';
import { Experience, Profile, Project, Skill, SocialLink } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDefaultProfile(): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        slug: 'vladislav-pavlenko',
      },
    });

    if (profile) {
      return profile;
    }

    return this.prisma.profile.findFirst();
  }

  async findSocialLinksByProfileIds(
    profileIds: readonly string[],
  ): Promise<SocialLink[]> {
    return this.prisma.socialLink.findMany({
      where: {
        profileId: {
          in: [...profileIds],
        },
      },
    });
  }

  async findSkillsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: {
        profileId: {
          in: [...profileIds],
        },
      },
    });
  }

  async findExperiencesByProfileIds(
    profileIds: readonly string[],
  ): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      where: {
        profileId: {
          in: [...profileIds],
        },
      },
    });
  }

  async findProjectsByProfileIds(
    profileIds: readonly string[],
  ): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        profileId: {
          in: [...profileIds],
        },
      },
    });
  }
}
