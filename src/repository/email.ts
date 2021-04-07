import { context } from "../context";

export class EmailRepository {
  private static keyPrefix = "email/";

  static saveEmailAuthKey(
    email: string,
    authCode: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      context.redisClient.set(
        this.keyPrefix + email,
        authCode,
        "EX",
        60 * 3,
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      )
    });
  }

  static findByEmail(email: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      context.redisClient.get(this.keyPrefix + email, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }
}