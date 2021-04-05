import { ObjectType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@ObjectType()
export class UserResponse {
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
