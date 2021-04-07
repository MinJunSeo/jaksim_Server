import { Field, ObjectType, createUnionType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "../../entity";

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

@ObjectType()
export class SuccessSignup {
  constructor() {
    this.message = "User Created";
  }

  @Field()
  message!: string;
}

@ObjectType()
export class AlreadyUserExists {
  constructor() {
    this.message = "User Already Exists";
  }

  @Field()
  message!: string;
}

export const SignupResult = createUnionType({
  name: "SignupResult",
  types: () => [SuccessSignup, AlreadyUserExists] as const,
  resolveType: args => {
    if (args.message === "User Created") {
      return SuccessSignup;
    }
    if (args.message === "Already User Exists") {
      return AlreadyUserExists;
    }
    return undefined;
  }
});