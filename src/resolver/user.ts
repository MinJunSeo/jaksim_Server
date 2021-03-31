import {
  Resolver,
  Mutation,
  Arg,
  Ctx
} from "type-graphql";
import { User } from "../entity";
import { SignupRequest } from "../dto";
import { PasswordService } from "../service";
import { Context } from "context";

@Resolver(User)
export class UserResolver {
  @Mutation()
  async signup(
    @Arg("req") req: SignupRequest,
    @Ctx() ctx: Context
  ): Promise<User> {
    req.password = PasswordService.encryptPassword(req.password);
    return ctx.prisma.user.create({
      data: {
        username: req.username,
        password: req.password,
        email: req.email,
        nickname: req.nickname
      }
    });
  }
}