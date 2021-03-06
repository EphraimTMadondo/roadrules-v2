import { z } from 'zod';

export const PhoneNumberSchema = z.string().min(6).max(13);
export type PhoneNumber = z.infer<typeof PhoneNumberSchema>;

export const PinSchema = z.string().length(4);
export type Pin = z.infer<typeof PinSchema>;

export const GenderSchema = z.union([z.literal('Male'), z.literal('Female')]);
export type Gender = z.infer<typeof GenderSchema>;

export const SendCodeSchema = z.object({
  phoneNumber: PhoneNumberSchema,
});

export const GetQuestionsSchema = z.object({
  limit: z.number().int(),
});
export type SendCode = z.infer<typeof SendCodeSchema>;

export const AuthCodeSchema = z.object({
  phoneNumber: PhoneNumberSchema,
  code: z.string(),
});
export type AuthCode = z.infer<typeof AuthCodeSchema>;

export const CreateUserSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  gender: GenderSchema,
  phoneNumber: PhoneNumberSchema,
  provinceId: z.number().int().min(1),
  pin: PinSchema,
  reEnterPin: PinSchema,
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const SignInSchema = z.object({
  phoneNumber: PhoneNumberSchema,
  pin: PinSchema,
});
export type SignIn = z.infer<typeof SignInSchema>;
