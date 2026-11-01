import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  url!: string;
}
