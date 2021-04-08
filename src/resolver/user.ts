import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  HttpResponse,
  SignupRequest,
  SendEmailRequest,
  SignupResult
} from "../dto";
import { UserService, EmailService } from "../service";

@Resolver(User)
export class UserResolver {
  @Mutation(() => SignupResult)
  async signup(@Arg("data") data: SignupRequest): Promise<typeof SignupResult> {
    return await UserService.signup(data);
  }

  @Mutation(() => HttpResponse)
  async sendVerificationEmail(
    @Arg("data") data: SendEmailRequest
  ): Promise<{ message: string }> {
    return await EmailService.sendVerificationEmail(data.email, data.nickname);
  }
}
