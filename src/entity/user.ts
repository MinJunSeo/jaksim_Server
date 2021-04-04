import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail, MaxLength, Length } from "class-validator";
import { Log } from "./log";
import { Category } from "./category";
import { Post } from "./post";

@ObjectType()
export class User {
  constructor(
    username: string,
    password: string,
    nickname: string,
    email: string
  ) {
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.email = email;
  }

  @Field((type) => ID)
  @Length(6, 8)
  readonly username!: string;

  @Field()
  @MaxLength(60)
  password!: string;

  @Field()
  @Length(2, 5)
  nickname!: string;

  @Field()
  @IsEmail()
  readonly email!: string;

  @Field((type) => [Log], { nullable: true })
  logs?: [Log] | null;

  @Field((type) => [Category], { nullable: true })
  categories?: [Category] | null;

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null;
}
