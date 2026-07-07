/**
 * BuyWise — Environment Configuration & Validation
 * 
 * Uses Zod to validate environment variables at startup.
 * Fails fast if required variables are missing.
 */

import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),

  // Auth
  NEXTAUTH_SECRET: z.string().min(16, 'NEXTAUTH_SECRET must be at least 16 characters'),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default('noreply@buywise.in'),

  // AI
  GEMINI_API_KEY: z.string().optional(),

  // Maps
  GOOGLE_MAPS_API_KEY: z.string().optional(),

  // Storage
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // Payments
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),

  // App
  NEXT_PUBLIC_APP_NAME: z.string().default('BuyWise'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Validated environment variables.
 * Access these instead of process.env directly for type safety.
 */
export const env = envSchema.parse(process.env);

/**
 * Type for validated environment.
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Check if a feature is available based on required env vars.
 * Useful for gracefully degrading when optional services aren't configured.
 */
export const features = {
  get googleAuth() {
    return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
  },
  get email() {
    return !!env.RESEND_API_KEY;
  },
  get ai() {
    return !!env.GEMINI_API_KEY;
  },
  get maps() {
    return !!env.GOOGLE_MAPS_API_KEY;
  },
  get storage() {
    return !!(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY);
  },
  get payments() {
    return !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
  },
  get analytics() {
    return !!env.NEXT_PUBLIC_POSTHOG_KEY;
  },
} as const;
