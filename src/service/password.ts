import bcrypt from "bcrypt";

export class PasswordService {
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
