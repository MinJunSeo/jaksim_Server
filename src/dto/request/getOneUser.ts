import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class GetOneUserRequest {
  @Field()
  @Length(6, 8)
  username!: string;
}