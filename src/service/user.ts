import {
  SignupRequest,
  SignupResult,
  SuccessSignup,
  AlreadyUserExists,
  VerifyEmailFailed,
  LoginRequest,
  LoginResult,
  Login,
  InvalidLoginInfo,
} from "../dto";
import { TokenRepository, UserRepository } from "../repository";
import { PasswordService } from "./password";
import { EmailService } from "./email";
import { JwtGenerator, validateArguments } from "../util";
import { signupSchema } from "../schema";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResult> {
    const validateArgumentsResult = await validateArguments(data, signupSchema);
    if (validateArgumentsResult) {
      throw validateArgumentsResult;
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

  static async login({
    username,
    password
  }: LoginRequest): Promise<typeof LoginResult> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      return new InvalidLoginInfo();
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      return new InvalidLoginInfo();
    }

    const accessToken = JwtGenerator.accessToken({ username });
    const refreshToken = JwtGenerator.refreshToken();
    await TokenRepository.saveRefreshToken(username, refreshToken);

    return new Login(accessToken, refreshToken);
  }
}
