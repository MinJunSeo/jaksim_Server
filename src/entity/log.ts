import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Log {
  @Field(type => ID)
  readonly id!: number;

  @Field()
  date!: Date

  @Field()
  type!: string;

  @Field(type => User)
  user!: User
}