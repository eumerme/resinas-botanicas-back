import { isValidCPF, isValidPhone } from "@brazilian-utils/brazilian-utils";
import Joi from "joi";

export const signupSchema = Joi.object<signup>({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).trim().required(),
  confirmPassword: Joi.ref("password"),
  cpf: Joi.string().length(11).custom(joiCpfValidation).required(),
  birthday: Joi.string().isoDate().required(),
  phone: Joi.string().min(8).max(11).custom(joiPhoneValidation).required(),
}).with("password", "confirmPassword");

export const signinSchema = Joi.object<signin>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCPF(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}

function joiPhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidPhone(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}

type signup = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  birthday: Date;
  phone: string;
};

type signin = { email: string; password: string };
