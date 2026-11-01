import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SocialLink')
export class SocialLinkModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  platform!: string;

  @Field(() => String)
  url!: string;
}
