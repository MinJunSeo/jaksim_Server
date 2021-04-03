import bcrypt from "bcrypt";
import config from "../config";

export class PasswordService {
  static async encryptPassword(password: string) {
    return await bcrypt.hash(password, config.PASSWORD_SALT);
  }
}