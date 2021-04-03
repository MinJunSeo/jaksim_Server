import { config } from "dotenv";
config();

export default {
  JWT_SECERT: process.env.JWT_SECERT || "",
  SERVER_PORT: process.env.SERVER_PORT || "",
  PASSWORD_SALT : process.env.PASSWORD_SALT || 0
}