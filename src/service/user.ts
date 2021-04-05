import { SignupRequest, UserRequest, UserResponse } from "../dto";
import { UserRepository } from "../repository/user";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";

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

  static getOneUser({ username }: UserRequest): Promise<UserResponse | null> {
    return UserRepository.findByUsername(username);
  }
}