import { Schema } from "joi";
import { BadRequest } from "../dto";

export const validateArguments = async (
  data,
  schema: Schema
): Promise<void | BadRequest> => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    return new BadRequest();
  }
};