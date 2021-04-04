import { transporter } from "../config/email";
import config from "../config";

class EmailService {
  // 대충 email input dto 만들면 될 듯
  async sendMail(email: string, nickname: string) {
    await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `"${nickname}" <${email}>`,
      subject: "Jaksim Email Auth",
      text: "대충 인증 코드 생성해서 보내라는 글"
    });
    transporter.close();
  }
}