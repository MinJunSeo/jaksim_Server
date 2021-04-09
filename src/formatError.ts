export const formatError = err => {
  let { message } = err;

  if (message.startsWith("Cannot query field")) {
    message = "Bad Gateway";
  } else {
    message = "Internal Server Error";
  }

  return { message };
};