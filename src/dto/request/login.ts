import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class LoginRequest {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @Length(8, 20)
  password!: string;
}