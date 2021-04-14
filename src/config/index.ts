import { config } from "dotenv";

config();

export default {
  SERVER_PORT: process.env.SERVER_PORT || "",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL: process.env.EMAIL || "",
  PASSWORD_SALT: process.env.PASSWORD_SALT || "",
  REDIS_HOST: process.env.REDIS_HOST || "",
  REDIS_PORT: process.env.REDIS_PORT || "",
  JWT_SECERT: process.env.JWT_SECERT || ""
};