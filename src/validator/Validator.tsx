import { z } from "zod";

export const detailsFormSchema = z.object({
  gift: z.boolean().optional(),
  stayInTheKow: z.array(z.string()).optional().default([]),
  email: z.string().email({ message: "Email is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  isBillingSameAsPickup: z.boolean().optional().default(false),
  mobile: z.number().min(5, { message: "Mobile is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  dob: z.string().date().min(1, { message: "Date of birth is required" }),
  billingAddress: z.string().min(1, { message: "Billing address is required" }),
  termsAndConditions: z.boolean().refine((v) => v, {
    message: "Terms and conditions is required",
  }),
});

export const InstructorSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
});
