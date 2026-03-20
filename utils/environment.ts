/**
 * Utility functions for environment detection
 */

// Check if code is running on the browser
export const isBrowser = typeof window !== 'undefined';

// Check if code is running on the server (Node.js)
export const isServer = !isBrowser;

/**
 * Safe way to access window object that works in both browser and server environments
 * @param callback Function that accesses window object
 * @param fallback Value to return when running on server
 * @returns Result of callback when in browser, fallback value when on server
 */
export function safeWindow<T>(callback: () => T, fallback: T): T {
  if (isBrowser) {
    return callback();
  }
  return fallback;
}
