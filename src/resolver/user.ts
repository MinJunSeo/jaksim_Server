import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  SignupRequest,
  SignupResult,
  SendVerificationEmailRequest,
  SendEmailResult
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
    @Arg("data") data: SendVerificationEmailRequest
  ): Promise<typeof SendEmailResult> {
    return await EmailService.sendVerificationEmail(data.email);
  }

  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }
}
