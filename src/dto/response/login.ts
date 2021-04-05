import { Field, InputType } from "type-graphql";

@InputType()
export class LoginResponse {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}
