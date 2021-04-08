import {
  SignupRequest,
  SignupResult,
  SuccessSignup,
  AlreadyUserExists,
  EmailVerificationFailed,
  VerifyEmailFailed
} from "../dto";
import { UserRepository } from "../repository";
import { PasswordService } from "./password";
import { EmailService } from "./email";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResult> {
    const user = await UserRepository.findByUsername(data.username);
    if (user) {
      return new AlreadyUserExists();
    }
    
    const verifyResult = await EmailService.verifyAuthCode(data.email, data.authCode);
    if (verifyResult instanceof VerifyEmailFailed) {
      return new EmailVerificationFailed();
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SuccessSignup();
  }
}
