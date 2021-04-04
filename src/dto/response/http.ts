import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class HttpResponse {
  @Field()
  message!: string;

  @Field()
  status!: number;
}