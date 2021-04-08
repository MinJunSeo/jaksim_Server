import { ApolloError } from "apollo-server";
import config from "../config";
import { transporter } from "../config/email";
import { VerifyEmailResult, VerifyEmailSuccess, VerifyEmailFailed } from "../dto";
import { generateEmailAuthKey } from "../util";
import { EmailRepository } from "../repository";

export class EmailService {
  static async sendVerificationEmail(
    email: string
  ): Promise<{ message: string}> {
    if (await this.sendMail(email)) {
      return { message: "SEND EMAIL SUCCESSFULLY" };
    }
    throw new ApolloError("Internal Server Error");
  }

  static async verifyAuthCode(
    email: string,
    authCode: string
  ): Promise<typeof VerifyEmailResult> {
    const storedAuthCode = await EmailRepository.findByEmail(email);
    if (authCode === storedAuthCode) {
      return new VerifyEmailSuccess();
    } else {
      return new VerifyEmailFailed();
    }
  }

  private static async sendMail(
    email: string,
  ): Promise<Boolean> {
    const authCode = generateEmailAuthKey();

    const sendResult = await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `<${email}>`,
      subject: "Jaksim Email Auth",
      text: `Email 인증 코드 : ${authCode}`
    });

    transporter.close();
    await EmailRepository.saveEmailAuthKey(email, authCode);

    return sendResult.accepted.length > 0;
  }
}