import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { context } from "../context";
import config from "../config";
import { Unauthorized } from "../dto";

export const auth: MiddlewareFn = async (_, next) => {
  const token: string = context.token;
  if (!token) {
    return new Unauthorized();
  }

  const bearer: string = token.split("Bearer ")[1];
  verify(bearer, config.JWT_SECERT, (err, decoded) => {
    if (err || !decoded) {
      return new Unauthorized();
    }

    context.decoded = decoded;
  });

  return await next();
};