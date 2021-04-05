import { transporter } from "../config/email";
import { SendEmailRequest } from "../dto";
import config from "../config";
import { generateEmailAuthKey } from "../util";

export class EmailService {
  static async sendMail({ email, nickname }: SendEmailRequest) {
    await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `"${nickname}" <${email}>`,
      subject: "Jaksim Email Auth",
      text: `Email 인증 코드 : ${generateEmailAuthKey()}`
    });
    transporter.close();
  }
}