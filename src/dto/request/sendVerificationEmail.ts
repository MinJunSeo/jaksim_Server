import { InputType, Field } from "type-graphql";
import { IsEmail, MaxLength } from "class-validator";

@InputType()
export class SendVerificationEmailRequest {
  @Field()
  @IsEmail()
  @MaxLength(25)
  email!: string;
}