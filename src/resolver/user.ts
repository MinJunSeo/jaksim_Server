import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  SignupRequest,
  SignupResult,
  SendEmailResult,
  LoginResult,
  LoginRequest
} from "../dto";
import { UserService, EmailService } from "../service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => SignupResult)
  async signup(
    @Arg("data") data: SignupRequest
  ): Promise<typeof SignupResult> {
    return await UserService.signup(data);
  }

  @Mutation(() => SendEmailResult)
  async sendVerificationEmail(
    @Arg("email") email: string
  ): Promise<typeof SendEmailResult> {
    return await EmailService.sendVerificationEmail(email);
  }

  @Mutation(() => LoginResult)
  async login(@Arg("data") data: LoginRequest): Promise<typeof LoginResult> {
    return await UserService.login(data);
  }
}
