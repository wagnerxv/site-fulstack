import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to handle async operations with error handling
 * @param promise - The promise to execute
 * @returns An object with either data or error
 */
export async function tryCatch<T>(
  promise: Promise<T>
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
