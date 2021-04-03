import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entity";
import { SignupRequest, GetOneUserRequest, HttpResponse, GetOneUserResponse } from "../dto";
import { UserService } from "../service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => HttpResponse)
  async signup(
    @Arg("data") data: SignupRequest,
  ): Promise<HttpResponse> {
    await UserService.signup(data);

    return {
      message: "User Created",
      status: 201
    };
  }
  
  @Query(() => GetOneUserResponse, { nullable: true })
  async getOneUser(
    @Arg("data") data: GetOneUserRequest
  ): Promise<GetOneUserResponse | null> {
    return await UserService.getOneUser(data);
  }
}