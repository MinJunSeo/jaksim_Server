import { ObjectType, Field, createUnionType } from "type-graphql";
import { BadRequest } from "./badRequest";

@ObjectType()
export class SendEmailSuccess {
  constructor() {
    this.message = "SEND EMAIL SUCCESSFULLY";
  }

  @Field()
  message: string;

  static getMessage() {
    return "SEND EMAIL SUCCESSFULLY";
  }
}

export const SendEmailResult = createUnionType({
  name: "SendEmailResult",
  types: () => [SendEmailSuccess, BadRequest],
  resolveType: args => {
    switch (args.message) {
      case SendEmailSuccess.getMessage(): {
        return SendEmailSuccess;
      }
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      default: {
        return undefined;
      }
    }
  }
});