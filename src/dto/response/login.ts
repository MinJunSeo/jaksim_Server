import { createUnionType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class Login {
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@ObjectType()
export class InvalidLoginInfo {
  constructor() {
    this.message = "Invalid Login Info";
  }

  @Field()
  message!: string;
}

export const LoginResult = createUnionType({
  name: "LoginResult",
  types: () => [Login, InvalidLoginInfo] as const,
  resolveType: (args) => {
    if ("accessToken" in args) {
      return Login;
    }
    if ("message" in args) {
      return InvalidLoginInfo;
    }
    return undefined;
  },
});
