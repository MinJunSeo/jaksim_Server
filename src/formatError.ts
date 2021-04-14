import { BadRequest } from "./dto";

export const formatError = (err) => {
  let { message, extensions } = err;
  console.log(message); // TODO remove
  console.log(extensions);

  if (message.startsWith("Cannot query field")) {
    message = "Bad Gateway";
  }
  else if (extensions?.code === "GRAPHQL_VALIDATION_FAILED") {
    return new BadRequest();
  }

  return { message };
};