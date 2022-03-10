import { z } from 'zod';

export const phoneNumberSchema = z.string().min(6).max(13);
