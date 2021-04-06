import nodemailer from "nodemailer";
import config from "./index";

export const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});