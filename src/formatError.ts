export const formatError = (err) => {
  const { message, extensions } = err;

  // class-validator exception handling
  if (message.startsWith("Argument")) {
    return {
      message: "Invalid Parameters",
      status: 400,
    };
  }

  return {
    message:
      extensions && extensions.status ? message : "Internal Server Error",
    status: extensions && extensions.status ? extensions.status : 500,
  };
};
