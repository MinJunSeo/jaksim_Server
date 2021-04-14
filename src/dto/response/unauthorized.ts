import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Unauthorized {
  constructor() {
    this.message = "UNAUTHORIZED";
  }

  @Field()
  message: string;
}