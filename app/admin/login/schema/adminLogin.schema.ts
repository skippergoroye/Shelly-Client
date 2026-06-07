import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
  stayLoggedIn: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;