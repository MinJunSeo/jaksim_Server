import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class SendEmailRequest {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(2, 6)
  nickname!: string;
}