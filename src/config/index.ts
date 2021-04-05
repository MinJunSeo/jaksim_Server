import { config } from "dotenv";

config();

export default {
  JWT_SECRET: process.env.JWT_SECRET || "",
  SERVER_PORT: process.env.SERVER_PORT || "",
<<<<<<< HEAD
  PASSWORD_SALT : process.env.PASSWORD_SALT || 0,
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL: process.env.EMAIL || ""
}
=======
  PASSWORD_SALT: process.env.PASSWORD_SALT || "",
};
>>>>>>> b07f04283d25d682bd9e775ec09561f92a94dab4
