import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required({ name: true, email: true, password: true });

export const AddAddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().optional(),
  city: z.string(),
  country: z.string(),
  pincode: z.string().length(6),
  userId: z.number(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddressId: z.number().optional(),
  defaultBillingAddressId: z.number().optional(),
});

export const UserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});
