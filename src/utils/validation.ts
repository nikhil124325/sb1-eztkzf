import { z } from 'zod';

export const emailSchema = z.string()
  .email('Invalid email format')
  .min(1, 'Email is required')
  .max(255, 'Email is too long');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, 'Password contains invalid characters');

export const validateEmail = (email: string): string[] => {
  try {
    emailSchema.parse(email);
    return [];
  } catch (err) {
    return err instanceof z.ZodError ? err.errors.map(e => e.message) : ['Invalid email'];
  }
};

export const validatePassword = (password: string): string[] => {
  try {
    passwordSchema.parse(password);
    return [];
  } catch (err) {
    return err instanceof z.ZodError ? err.errors.map(e => e.message) : ['Invalid password'];
  }
};