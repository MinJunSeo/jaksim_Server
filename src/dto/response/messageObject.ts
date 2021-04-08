import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MessageObject {
  @Field()
  message!: string;
}