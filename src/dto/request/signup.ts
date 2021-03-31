import { InputType, Field } from "type-graphql";
import { Length, IsEmail, MaxLength } from "class-validator";

@InputType()
export class SignupRequest {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @Length(8, 20)
  password!: string;

  @Field()
  @IsEmail()
  @MaxLength(25)
  email!: string;

  @Field()
  @Length(2, 6)
  nickname!: string;
}