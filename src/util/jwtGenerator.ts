import * as jwt from "jsonwebtoken";
import config from "../config";

export interface JwtPayload {
  username: string;
}

export class JwtGenerator {
  static accessToken(payload: JwtPayload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_ACCESS_EXP,
    });
  }

  static refreshToken() {
    return jwt.sign({}, config.JWT_SECRET, {
      expiresIn: config.JWT_REFRESH_EXP,
    });
  }
}