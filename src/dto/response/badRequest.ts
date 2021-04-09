import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BadRequest {
  constructor() {
    this.message = "BAD REQUEST";
  }

  @Field()
  message: string;

  getMessage(): string {
    return this.message;
  }
}