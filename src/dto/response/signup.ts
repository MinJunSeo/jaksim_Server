import { Field, ObjectType, createUnionType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "../../entity";
import { VerifyEmailFailed } from "./verifyEmail";

@ObjectType()
export class Signup {
  constructor(username: string, email: string, nickname: string) {
    this.username = username;
    this.email = email;
    this.nickname = nickname;
  }

  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(2, 5)
  nickname!: string;

  static from(user: User) {
    return new Signup(user.username, user.email, user.nickname);
  }
}

enum SignupMessage {
  SuccessSignup = "USER CREATED",
  AlreadyUserExists = "ALREADY USER EXISTS"
}

@ObjectType()
export class SuccessSignup {
  constructor() {
    this.message = SignupMessage.SuccessSignup;
  }

  @Field()
  message!: string;
}

@ObjectType()
export class AlreadyUserExists {
  constructor() {
    this.message = SignupMessage.AlreadyUserExists;
  }

  @Field()
  message!: string;
}

export const SignupResult = createUnionType({
  name: "SignupResult",
  types: () => [SuccessSignup, AlreadyUserExists, VerifyEmailFailed] as const,
  resolveType: args => {
    switch (args.message) {
      case SignupMessage.SuccessSignup: {
        return SuccessSignup;
      }
      case SignupMessage.AlreadyUserExists: {
        return AlreadyUserExists;
      }
      case VerifyEmailFailed.getMessage(): {
        return VerifyEmailFailed;
      }
      default: {
        return undefined;
      }
    }
  }
});