import { SignupRequest, UserRequest, UserResponse } from "../dto";
import { UserRepository } from "../repository/user";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";

export class UserService {
  static async signup(req: SignupRequest): Promise<void> {
    const user = await UserRepository.findByUsername(req.username);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409,
      });
    }

    req.password = PasswordService.encryptPassword(req.password);
    return UserRepository.save(req.toUserEntity());
  }

  static getOneUser({ username }: UserRequest): Promise<UserResponse | null> {
    return UserRepository.findByUsername(username);
  }
}