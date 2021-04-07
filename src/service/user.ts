import {
  LoginRequest,
  SignupRequest,
  LoginResponse,
  SignupResponse,
  Signup,
  SuccessSignup,
  AlreadyUserExists
} from "../dto";
import { UserRepository, TokenRepository } from "../repository";
import { UserInputError, AuthenticationError } from "apollo-server";
import { PasswordService } from "./password";
import { EmailService } from "./email";
import { JwtGenerator } from "../util/jwtGenerator";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResponse> {
    const user = await UserRepository.findByUsername(data.username);
    if (user) {
      return new AlreadyUserExists();
    }
    
    await EmailService.verifyAuthCode(data.email, data.authCode);
    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SuccessSignup();
  }

  static async getOneUser(username: string): Promise<Signup | null> {
    const user = await UserRepository.findByUsername(username);
    return user ? Signup.from(user) : null;
  }

  static async login({
    username,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      throw new AuthenticationError("Login Failed");
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new AuthenticationError("Login Failed");
    }

    const accessToken = JwtGenerator.accessToken({ username });
    const refreshToken = JwtGenerator.refreshToken();
    await TokenRepository.saveRefreshToken(username, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
