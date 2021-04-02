import { context } from "../context";
import { SignupRequest, GetOneUserRequest, GetOneUserResponse } from "../dto";

export class UserService {
  static async signup(req: SignupRequest): Promise<void> {
    await context.prisma.user.create({
      data: {
        username: req.username,
        password: req.password,
        email: req.email,
        nickname: req.nickname
      }
    });
  }

  static async getOneUser({ username }: GetOneUserRequest): Promise<GetOneUserResponse | null> {
    return await context.prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        email: true,
        nickname: true
      }
    });
  }
}