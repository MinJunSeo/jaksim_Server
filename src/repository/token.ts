import { context } from "../context";

export class TokenRepository {
  private static keyPrefix = "refresh/";

  static saveRefreshToken(
    username: string,
    refreshToken: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      context.redisClient.set(
        this.keyPrefix + username,
        refreshToken,
        "EX",
        60 * 60 * 24 * 7,
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  }

  static findByUsername(username: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      context.redisClient.get(this.keyPrefix + username, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }
}