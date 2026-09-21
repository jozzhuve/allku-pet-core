import { z } from 'zod';

export const createCustomerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/),
});

export type CreateCustomerRequest = z.infer<typeof createCustomerSchema>;
