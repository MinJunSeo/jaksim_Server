import { createUnionType, Field, ObjectType } from "type-graphql";

enum LoginMessage {
  SuccessLogin = "LOGIN SUCCESSFULLY COMPLETE",
  InvalidLoginInfo = "INVALID LOGIN INFO",
}

@ObjectType()
export class Login {
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.message = LoginMessage.SuccessLogin;
  }

  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field()
  message!: string;
}

@ObjectType()
export class InvalidLoginInfo {
  constructor() {
    this.message = LoginMessage.InvalidLoginInfo;
  }

  @Field()
  message!: string;
}

export const LoginResult = createUnionType({
  name: "LoginResult",
  types: () => [Login, InvalidLoginInfo] as const,
  resolveType: (args) => {
    switch (args.message) {
      case LoginMessage.SuccessLogin: {
        return Login;
      }
      case LoginMessage.InvalidLoginInfo: {
        return InvalidLoginInfo;
      }
      default: {
        return undefined;
      }
    }
  },
});