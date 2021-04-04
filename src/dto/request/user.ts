import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class UserRequest {
  @Field()
  @Length(6, 8)
  username!: string;
}
