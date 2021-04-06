import { Field, ObjectType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { User } from "../../entity";

@ObjectType()
export class UserResponse {
  private constructor(username: string, email: string, nickname: string) {
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
    return new UserResponse(user.username, user.email, user.nickname);
  }
}
