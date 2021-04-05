import "reflect-metadata";
import { graphql } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { buildSchema } from "type-graphql";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>
}

export const graphqlCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolver/user.ts"]
    }),
    source,
    variableValues
  });
};