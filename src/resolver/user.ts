import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import { HttpResponse, SignupRequest, UserResponse, SendEmailRequest } from "../dto";
import { UserService, EmailService } from "../service";

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

  @Query(() => HttpResponse)
  async verifyEmail(@Arg("data") data: SendEmailRequest): Promise<HttpResponse> {
    return await EmailService.sendVerificationEmail(data);
  }
}
