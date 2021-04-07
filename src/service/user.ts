import {
  LoginRequest,
  SignupRequest,
  UserResponse,
  LoginResponse,
} from "../dto";
import { UserRepository, TokenRepository } from "../repository";
import { UserInputError, AuthenticationError } from "apollo-server";
import { PasswordService } from "./password";
import { EmailService } from "./email";
import { JwtGenerator } from "../util/jwtGenerator";

export class UserService {
  static async signup(data: SignupRequest): Promise<void> {
    const user = await UserRepository.findByUsername(data.username);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409,
      });
    }
    
    await EmailService.verifyAuthCode(data.email, data.authCode);
    
    data.password = await PasswordService.encryptPassword(data.password);
    return UserRepository.save(data.toUserEntity());
  }

  static async getOneUser(username: string): Promise<UserResponse | null> {
    const user = await UserRepository.findByUsername(username);
    return user ? UserResponse.from(user) : null;
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
