import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Invalid email format',
      }),

    number: z
      .string()
      .min(1, 'Phone number is required')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number is too long'),

    profile_picture: z.string().optional(),

    gender: z
      .enum(['male', 'female', 'others'])
      .refine((val) => val !== undefined, { message: 'Gender is required' }),
  }),
});
