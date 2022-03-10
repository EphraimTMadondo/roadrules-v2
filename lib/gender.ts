import { z } from 'zod';

export const genderSchema = z.union([z.literal('Male'), z.literal('Female')]);
