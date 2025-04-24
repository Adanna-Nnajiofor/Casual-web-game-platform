import { z } from "zod";

//  User registration schema
export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

//  User login schema
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Game session submission schema
export const sessionSchema = z.object({
  gameId: z.string().nonempty("Game ID is required").uuid("Invalid game ID"),

  score: z.number().min(0, "Score must be zero or higher"),

  duration: z.number().min(1, "Session must last at least 1 second"),
});

// Optional: Validate helper
export function validate<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.format();
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}
