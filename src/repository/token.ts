import { context } from "../context";

export class TokenRepository {
  static async saveRefreshToken(username: string, refreshToken: string) {
    context.redisClient.set(
      `refresh/${username}`,
      refreshToken,
      "EX",
      60 * 60 * 24 * 7
    );
  }
}
