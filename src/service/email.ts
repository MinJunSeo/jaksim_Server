import { transporter } from "../config/email";
import { SendEmailRequest } from "../dto";
import config from "../config";

export class EmailService {
  async sendMail({ email, nickname }: SendEmailRequest) {
    await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `"${nickname}" <${email}>`,
      subject: "Jaksim Email Auth",
      text: "대충 인증 코드 생성해서 보내라는 글"
    });
    transporter.close();
  }
}