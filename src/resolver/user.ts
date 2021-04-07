import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  HttpResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SendEmailRequest,
  SignupResult
} from "../dto";
import { UserService, EmailService } from "../service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => HttpResponse)
  async signup(@Arg("data") data: SignupRequest): Promise<typeof SignupResult> {
    return await UserService.signup(data);
  }

  @Query(() => User, { nullable: true })
  async getOneUser(
    @Arg("username") username: string
  ): Promise<User | null> {
    return null;
  }

  @Mutation(() => HttpResponse)
  async sendVerificationEmail(@Arg("data") data: SendEmailRequest): Promise<HttpResponse> {
    return await EmailService.sendVerificationEmail(data);
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("data") data: LoginRequest): Promise<LoginResponse> {
    return await UserService.login(data);
  }
}
