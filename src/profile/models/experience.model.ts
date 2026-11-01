import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => String)
  period!: string;

  @Field(() => [String])
  achievements!: string[];
}
