import { ObjectType, Field, createUnionType } from "type-graphql";

enum VerifyEmailMessage {
  Success = "OK",
  Fail = "Email Verification Faield"
}

@ObjectType()
export class VerfiyEmailSuccess {
  constructor() {
    this.message = VerifyEmailMessage.Success;
  }

  @Field()
  message!: string;
}

@ObjectType()
export class VerfiyEmailFailed {
  constructor() {
    this.message = VerifyEmailMessage.Fail;
  }

  @Field()
  message!: string;
}

export const VerifyEmailResult = createUnionType({
  name: "VerifyEmailResult",
  types: () => [VerfiyEmailSuccess, VerfiyEmailFailed],
  resolveType: args => {
    switch (args.message) {
      case VerifyEmailMessage.Success: {
        return VerfiyEmailSuccess;
      }
      case VerifyEmailMessage.Fail: {
        return VerfiyEmailFailed;
      }
      default: {
        return undefined;
      }
    }
  }
});