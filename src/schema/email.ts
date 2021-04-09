import Joi from "joi";

export const emailSchema = Joi.string().email().max(25).required();