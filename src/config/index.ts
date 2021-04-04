import { config } from "dotenv";
config();

export default {
  JWT_SECRET: process.env.JWT_SECRET || "",
  SERVER_PORT: process.env.SERVER_PORT || "",
  PASSWORD_SALT: process.env.PASSWORD_SALT || "",
};
