import { LoginRequest, SignupRequest, UserResponse } from "../dto";
import { UserRepository } from "../repository";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";
import { UnauthorizedError } from "type-graphql";
import { LoginResponse } from "../dto/response/login";
import { JwtGenerator } from "../util/jwtGenerator";
import { TokenRepository } from "../repository/token";

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
  }: LoginRequest): Promise<LoginResponse> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedError();
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
