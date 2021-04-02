import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class GetOneUserRequest {
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