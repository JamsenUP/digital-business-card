import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model';
import { ProjectModel } from './project.model';
import { SkillModel } from './skill.model';
import { SocialLinkModel } from './social-link.model';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [SocialLinkModel])
  links!: SocialLinkModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}
