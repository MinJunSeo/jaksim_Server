import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";

enum LogType {
  Login = "LOGIN",
  Posting = "POSTING"
}

@ObjectType()
export class Log {
  @Field(type => ID)
  readonly id!: number;

  @Field()
  date!: Date;

  @Field(type => LogType)
  type!: LogType;

  @Field(type => User)
  user!: User;
}
