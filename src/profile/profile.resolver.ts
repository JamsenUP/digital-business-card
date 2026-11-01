import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Experience,
  Profile,
  Project,
  Skill,
  SocialLink,
} from '@prisma/client';
import { ProfileLoader } from './loaders/profile.loader';
import { ExperienceModel } from './models/experience.model';
import { ProfileModel } from './models/profile.model';
import { ProjectModel } from './models/project.model';
import { SkillModel } from './models/skill.model';
import { SocialLinkModel } from './models/social-link.model';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileLoader: ProfileLoader,
  ) {}

  @Query(() => ProfileModel, {
    name: 'profile',
    description: 'Получить цифровую визитку кандидата',
  })
  async getProfile(): Promise<Profile> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [SocialLinkModel], { name: 'links' })
  async getLinks(@Parent() profile: Profile): Promise<SocialLink[]> {
    return this.profileLoader.socialLinksLoader.load(profile.id);
  }

  @ResolveField(() => [SkillModel], { name: 'skills' })
  async getSkills(@Parent() profile: Profile): Promise<Skill[]> {
    return this.profileLoader.skillsLoader.load(profile.id);
  }

  @ResolveField(() => [ExperienceModel], { name: 'experience' })
  async getExperience(@Parent() profile: Profile): Promise<Experience[]> {
    return this.profileLoader.experiencesLoader.load(profile.id);
  }

  @ResolveField(() => [ProjectModel], { name: 'projects' })
  async getProjects(@Parent() profile: Profile): Promise<Project[]> {
    return this.profileLoader.projectsLoader.load(profile.id);
  }
}
