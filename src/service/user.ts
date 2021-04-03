import { UserRepository } from "../repository";
import { SignupRequest, GetOneUserRequest, GetOneUserResponse } from "../dto";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";

export class UserService {
  static async signup(data: SignupRequest): Promise<void> {
    const user = await this.getOneUser({ username: data.username });
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409
      });
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.signup(data);
  }

  static async getOneUser({ username }: GetOneUserRequest): Promise<GetOneUserResponse | null> {
    return await UserRepository.getOneUser({ username });
  }
}