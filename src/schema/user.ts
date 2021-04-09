import Joi from "joi";

export const signupSchema = Joi.object()
  .keys({
    username: Joi.string().min(6).max(8).alphanum().required(),
    password: Joi.string().min(8).max(20)
      .regex(/^(?=.*[A-Za-z])(?=.*[0-9])[~`!@#$%^&*()_+\-=\[\]\\|;':",./<>?a-zA-Z0-9]$/).required(),
    email: Joi.string().email().max(25).required(),
    nickname: Joi.string().min(2).max(6).regex(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/).required(),
    authCode: Joi.string().length(6).regex(/^[0-9]$/).required()
  });