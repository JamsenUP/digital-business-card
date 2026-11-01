import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Experience, Project, Skill, SocialLink } from '@prisma/client';
import { ProfileRepository } from '../repositories/profile.repository';

@Injectable({ scope: Scope.REQUEST })
export class ProfileLoader {
  readonly socialLinksLoader: DataLoader<string, SocialLink[]>;
  readonly skillsLoader: DataLoader<string, Skill[]>;
  readonly experiencesLoader: DataLoader<string, Experience[]>;
  readonly projectsLoader: DataLoader<string, Project[]>;

  constructor(private readonly profileRepository: ProfileRepository) {
    this.socialLinksLoader = new DataLoader<string, SocialLink[]>(
      async (keys: readonly string[]) => {
        const socialLinks =
          await this.profileRepository.findSocialLinksByProfileIds(keys);
        const map = new Map<string, SocialLink[]>();

        for (const link of socialLinks) {
          const list = map.get(link.profileId);
          if (list) {
            list.push(link);
          } else {
            map.set(link.profileId, [link]);
          }
        }

        return keys.map((id) => map.get(id) ?? []);
      },
    );

    this.skillsLoader = new DataLoader<string, Skill[]>(
      async (keys: readonly string[]) => {
        const skills = await this.profileRepository.findSkillsByProfileIds(keys);
        const map = new Map<string, Skill[]>();

        for (const skill of skills) {
          const list = map.get(skill.profileId);
          if (list) {
            list.push(skill);
          } else {
            map.set(skill.profileId, [skill]);
          }
        }

        return keys.map((id) => map.get(id) ?? []);
      },
    );

    this.experiencesLoader = new DataLoader<string, Experience[]>(
      async (keys: readonly string[]) => {
        const experiences =
          await this.profileRepository.findExperiencesByProfileIds(keys);
        const map = new Map<string, Experience[]>();

        for (const experience of experiences) {
          const list = map.get(experience.profileId);
          if (list) {
            list.push(experience);
          } else {
            map.set(experience.profileId, [experience]);
          }
        }

        return keys.map((id) => map.get(id) ?? []);
      },
    );

    this.projectsLoader = new DataLoader<string, Project[]>(
      async (keys: readonly string[]) => {
        const projects =
          await this.profileRepository.findProjectsByProfileIds(keys);
        const map = new Map<string, Project[]>();

        for (const project of projects) {
          const list = map.get(project.profileId);
          if (list) {
            list.push(project);
          } else {
            map.set(project.profileId, [project]);
          }
        }

        return keys.map((id) => map.get(id) ?? []);
      },
    );
  }
}
