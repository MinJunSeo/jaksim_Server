import { ObjectType, Field } from "type-graphql";
import { Post } from "./post";

@ObjectType()
export class Tag {
  @Field(type => Post)
  post!: Post;

  @Field()
  tagName!: string;

  @Field()
  createdAt!: Date;
}