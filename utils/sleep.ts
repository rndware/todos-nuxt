/**
 * Returns a Promise that resolves after a specified delay.
 * Used for testing delays related to async calls
 * @param n The number of milliseconds to wait before resolving the Promise.
 * @returns A Promise that resolves with undefined after the specified delay.
 */
export function sleep(n: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, n));
}