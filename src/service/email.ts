import { UserInputError, ApolloError, AuthenticationError } from "apollo-server";
import config from "../config";
import { transporter } from "../config/email";
import { SendEmailRequest, HttpResponse, SignupRequest } from "../dto";
import { generateEmailAuthKey } from "../util";
import { EmailRepository, UserRepository,  } from "../repository";

export class EmailService {
  static async sendVerificationEmail({ email, nickname }: SendEmailRequest): Promise<HttpResponse> {
    const user = await UserRepository.findByEmail(email);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409
      });
    }

    const isSuccess = await EmailService.sendMail({ email, nickname });
    if (!isSuccess) {
      throw new ApolloError("Internal Server Error");
    }
    return { message: "OK", status: 200 };
  }

  static async verifyAuthCode(
    email: string,
    authCode: string
  ): Promise<void> {
    const storedAuthCode = await EmailRepository.findByEmail(email);
    if (authCode === storedAuthCode) {
      return;
    } else {
      throw new AuthenticationError("Verify Failed");
    }
  }

  private static async sendMail({ email, nickname }: SendEmailRequest): Promise<Boolean> {
    const authCode = generateEmailAuthKey();

    const sendResult = await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `"${nickname}" <${email}>`,
      subject: "Jaksim Email Auth",
      text: `Email 인증 코드 : ${authCode}`
    });

    transporter.close();
    await EmailRepository.saveEmailAuthKey(email, authCode);

    return sendResult.accepted.length > 0;
  }
}