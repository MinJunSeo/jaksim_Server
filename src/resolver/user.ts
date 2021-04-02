import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entity";
import { SignupRequest, GetOneUserRequest, HttpResponse, GetOneUserResponse } from "../dto";
import { PasswordService, UserService } from "../service";
import { UserInputError } from "apollo-server";

@Resolver(User)
export class UserResolver {
  @Mutation(() => HttpResponse)
  async signup(
    @Arg("data") data: SignupRequest,
  ): Promise<HttpResponse> {
    const user = await UserService.getOneUser({ username: data.username });
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409
      });
    }

    data.password = PasswordService.encryptPassword(data.password);
    await UserService.signup(data);

    return {
      message: "User Created",
      status: 201
    };
  }
  
  @Query(() => User, { nullable: true })
  async getOneUser(
    @Arg("data") data: GetOneUserRequest
  ): Promise<GetOneUserResponse | null> {
    return await UserService.getOneUser(data);
  }
}