import { ObjectType, Field } from "type-graphql";
import { Length, IsEmail, MaxLength } from "class-validator";
import { Log, Category, Post } from "../../entity";

@ObjectType()
export class GetOneUserResponse {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(2, 5)
  nickname!: string;
}