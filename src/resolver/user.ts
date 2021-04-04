import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import { HttpResponse, SignupRequest, UserResponse } from "../dto";
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

  @Query(() => User, { nullable: true })
  async getOneUser(
    @Arg("username") username: string
  ): Promise<UserResponse | null> {
    return await UserService.getOneUser(username);
  }
}
