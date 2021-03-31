import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";
import { Log } from "./log";
import { Category } from "./category";
import { Post } from "./post";

@ObjectType()
export class User {
  @Field(type => ID)
  readonly username!: string;

  @Field()
  password!: string;

  @Field()
  nickname!: string;

  @Field()
  @IsEmail()
  readonly email!: string;

  @Field(type => [Log], { nullable: true })
  logs!: [Log] | null

  @Field(type => [Category], { nullable: true })
  categories!: [Category] | null

  @Field(type => [Post], { nullable: true })
  posts!: [Post] | null
}