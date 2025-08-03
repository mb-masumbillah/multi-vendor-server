import { z } from 'zod';

export const vendorDetailsValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Owner name is required'),
    email: z.string().nonempty('Email is required').email('Invalid email'),
    number: z.string().nonempty('Company phone is required'),
    gender: z
      .enum(['male', 'female', 'others'])
      .refine((val) => val !== undefined, {
        message: 'Gender is required',
      }),
    vendorDetails: z.object({
      companyName: z.string().nonempty('Company name is required'),
      transportType: z
        .enum(['bus', 'car', 'truck', 'microbus', 'others'])
        .refine((val) => val !== undefined, {
          message: 'Transport type is required',
        }),
      companyAddress: z.string().nonempty('Company address is required'),
    }),
  }),
});
