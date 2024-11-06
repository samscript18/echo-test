import { z } from 'zod';

export const SignUpSchema = z
  .object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    date_of_birth: z.string().date().optional(),
    permanent_address: z.string().optional(),
    present_address: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  })
  .required({ userName: true, email: true, password: true });

export const UpdateAdminSchema = z.object({
  userName: z.string().optional(),
  email: z.string().email().optional(),
  date_of_birth: z.string().date().optional(),
  permanent_address: z.string().optional(),
  present_address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
});

export const RoleSchema = z.object({
  role: z.enum(['ADMIN']),
});
