import {
  LoginRequest,
  SignupRequest,
  UserResponse,
  LoginResult,
  InvalidLoginInfo,
  Login,
} from "../dto";
import { UserRepository, TokenRepository } from "../repository";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";
import { JwtGenerator } from "../util/jwtGenerator";

export class UserService {
  static async signup(data: SignupRequest): Promise<void> {
    const user = await UserRepository.findByUsername(data.username);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409,
      });
    }

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
  }: LoginRequest): Promise<typeof LoginResult> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      return {
        message: "Invalid login info",
      } as InvalidLoginInfo;
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      return {
        message: "Invalid login info",
      } as InvalidLoginInfo;
    }

    const accessToken = JwtGenerator.accessToken({ username });
    const refreshToken = JwtGenerator.refreshToken();
    await TokenRepository.saveRefreshToken(username, refreshToken);

    return {
      accessToken,
      refreshToken,
    } as Login;
  }
}
