import { z } from "zod";

// Signup schema
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  college: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  photoUrl: z.string().optional()
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

// Profile update schema (all fields optional but validated if provided)
export const profileUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  college: z.string().optional(),
  photoUrl: z.string().url().optional()
});

// Helper to validate a single field against a schema
export function validateField(schema, fieldName, value) {
  const fieldSchema = schema.shape[fieldName];
  if (!fieldSchema) return null; // field not defined in schema
  const result = fieldSchema.safeParse(value);
  if (result.success) return null;
  const firstError = result.error?.errors?.[0];
  return firstError ? firstError.message : "Invalid value";
}

// Helper to validate the whole form data against a schema
export function validateForm(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, errors: {} };
  }
  const flattened = result.error.flatten();
  return { success: false, errors: flattened.fieldErrors };
}

