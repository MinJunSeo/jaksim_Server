import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HttpResponse {
  @Field()
  message!: string;

  @Field()
  status!: number;
}
