import { ObjectType, Field, createUnionType } from "type-graphql";

enum VerifyEmailMessage {
  Success = "OK",
  Fail = "Email Verification Faield"
}

@ObjectType()
export class VerifyEmailSuccess {
  constructor() {
    this.message = VerifyEmailMessage.Success;
  }

  @Field()
  message!: string;
}

@ObjectType()
export class VerifyEmailFailed {
  constructor() {
    this.message = VerifyEmailMessage.Fail;
  }

  @Field()
  message!: string;
}

export const VerifyEmailResult = createUnionType({
  name: "VerifyEmailResult",
  types: () => [VerifyEmailSuccess, VerifyEmailFailed],
  resolveType: args => {
    switch (args.message) {
      case VerifyEmailMessage.Success: {
        return VerifyEmailSuccess;
      }
      case VerifyEmailMessage.Fail: {
        return VerifyEmailFailed;
      }
      default: {
        return undefined;
      }
    }
  }
});