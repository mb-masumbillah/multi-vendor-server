import z from 'zod';

export const createUserTokenValidation = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Invalid email format',
      }),
  }),
});
