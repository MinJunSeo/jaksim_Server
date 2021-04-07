export const formatError = err => {
  let { message } = err;

  if (message.startsWith("Cannot query field")) {
    message = "Bad Gateway";
  }

  return { message };
};