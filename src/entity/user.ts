import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail, MaxLength } from "class-validator";
import { Log } from "./log";
import { Category } from "./category";
import { Post } from "./post";
import { HttpResponse, SignupRequest } from "../dto";
import { Context } from "context";

@ObjectType()
export class User {
  @Field(type => ID)
  readonly username!: string;

  @Field()
  @MaxLength(60)
  password!: string;

  @Field()
  nickname!: string;

  @Field()
  @IsEmail()
  readonly email!: string;

  @Field(type => [Log], { nullable: true })
  logs?: [Log] | null

  @Field(type => [Category], { nullable: true })
  categories?: [Category] | null

  @Field(type => [Post], { nullable: true })
  posts?: [Post] | null
}