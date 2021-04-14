import { PrismaClient } from "@prisma/client";
import { createClient, RedisClient } from "redis";
import config from "./config";

const prisma = new PrismaClient();
const redisClient = createClient({
  host: config.REDIS_HOST,
  port: parseInt(config.REDIS_PORT),
  password: config.REDIS_PASS,
});

export interface Context {
  prisma: PrismaClient;
  redisClient: RedisClient;
  token: string;
  decoded: object;
}

export const context: Context = {
  prisma,
  redisClient,
  token: "",
  decoded: {}
};
