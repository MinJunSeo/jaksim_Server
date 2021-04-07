import { createUnionType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class Login {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@ObjectType()
export class InvalidLoginInfo {
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
