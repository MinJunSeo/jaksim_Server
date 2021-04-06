import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  HttpResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  UserResponse,
} from "../dto";
import { UserService } from "../service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => HttpResponse)
  async signup(@Arg("data") data: SignupRequest): Promise<HttpResponse> {
    await UserService.signup(data);
    return {
      message: "User Created",
      status: 201,
    };
  }

  @Query(() => UserResponse, { nullable: true })
  async getOneUser(
    @Arg("username") username: string
  ): Promise<UserResponse | null> {
    return await UserService.getOneUser(username);
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("data") data: LoginRequest): Promise<LoginResponse> {
    return await UserService.login(data);
  }
}
