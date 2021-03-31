import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Post } from "./post";

@ObjectType()
export class Category {
  @Field(type => ID)
  readonly id!: number;

  @Field()
  name!: string;

  @Field(type => User)
  user!: User;

  @Field(type => [Post], { nullable: true })
  posts!: [Post] | null;
}