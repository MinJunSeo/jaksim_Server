import { UserInputError } from "apollo-server";
import config from "../config";
import { transporter } from "../config/email";
import { SendEmailRequest } from "../dto";
import { generateEmailAuthKey } from "../util";
import { UserRepository } from "../repository";

export class EmailService {
  static async sendVerificationEmail({ email, nickname }: SendEmailRequest) {
    const user = await UserRepository.findByEmail(email);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409
      });
    }

    await EmailService.sendMail({ email, nickname });
  }

  static async sendMail({ email, nickname }: SendEmailRequest): Promise<Boolean> {
    const sendResult = await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `"${nickname}" <${email}>`,
      subject: "Jaksim Email Auth",
      text: `Email 인증 코드 : ${generateEmailAuthKey()}`
    });
    transporter.close();
    return sendResult.accepted.length > 0;
  }
}