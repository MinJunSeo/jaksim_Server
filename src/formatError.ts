import { ValidationError } from "apollo-server";

export const formatError = err => {
  let { message, extensions } = err;

  // class-validator and graphql validation exception handling
  if (err instanceof ValidationError || message.startsWith("Argument")) {
    message = "Invalid Parameteres";
    extensions = { status: 400 };
  }

  return {
    message:
      extensions && extensions.status ? message : "Internal Server Error",
    status: extensions && extensions.status ? extensions.status : 500,
  };
};
