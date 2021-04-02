import crypto from "crypto";
import config from "../config"

export class PasswordService {
  static encryptPassword(password: string) {
    return crypto
      .pbkdf2Sync(password, config.PASSWORD_SALT, 101856, 44, "sha512")
      .toString("base64");
  }
}