import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entity";
import { SignupRequest, HttpResponse, UserResponse, UserRequest } from "../dto";
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
    @Arg("data") data: UserRequest
  ): Promise<UserResponse | null> {
    return await UserService.getOneUser(data);
  }
}
