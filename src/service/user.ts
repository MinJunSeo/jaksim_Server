import {
  SignupRequest,
  SignupResult,
  SuccessSignup,
  AlreadyUserExists,
  EmailVerificationFailed
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
    
    if (await EmailService.verifyAuthCode(data.email, data.authCode)) {
      return new EmailVerificationFailed();
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SuccessSignup();
  }
}
