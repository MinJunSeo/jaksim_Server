import {
  SignupRequest,
  SignupResult,
  SuccessSignup,
  AlreadyUserExists,
  VerifyEmailFailed
} from "../dto";
import { UserRepository } from "../repository";
import { PasswordService } from "./password";
import { EmailService } from "./email";
import { validateArguments } from "../util";
import { signupSchema } from "../schema";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResult> {
    const validateArgumentsResult = await validateArguments(data, signupSchema);
    if (validateArgumentsResult) {
      return validateArgumentsResult;
    }

    const user = await UserRepository.findByEmail(data.email);
    if (user) {
      return new AlreadyUserExists();
    }
    
    const verifyResult = await EmailService.verifyAuthCode(data.email, data.authCode);
    if (verifyResult instanceof VerifyEmailFailed) {
      return verifyResult;
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SuccessSignup();
  }
}
