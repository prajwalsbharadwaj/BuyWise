import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to merge CSS class names conditionally.
 * Unlike standard tailwind-merge setups, we only use clsx since we 
 * are using Vanilla CSS modules and don't need utility conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
