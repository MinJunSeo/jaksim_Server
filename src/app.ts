import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolver";
import { context } from "./context";
import config from "./config";
import { formatError } from "./formatError";

export const app = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  new ApolloServer({
    schema,
    context,
    debug: false,
    formatError,
  }).listen({ port: config.SERVER_PORT }, () => {
    console.log(`Server listening at ${config.SERVER_PORT} port!`);
  });
};
