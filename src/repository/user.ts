import { context } from "../context";
import { SignupRequest, GetOneUserRequest, GetOneUserResponse } from "../dto";

export class UserRepository {
  static async signup(data: SignupRequest): Promise<void> {
    await context.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        nickname: data.nickname
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