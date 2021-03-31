import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import config from "./config";

export const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  new ApolloServer({ schema, context, debug: false })
    .listen({ port: config.SERVER_PORT }, () => {
      console.log(
        `Server listening at ${config.SERVER_PORT} port!`
      );
    });
};