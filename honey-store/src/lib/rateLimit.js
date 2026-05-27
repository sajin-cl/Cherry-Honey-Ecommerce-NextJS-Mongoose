/**
 * Simple in-process rate limiter.
 * Uses a Map keyed by (IP + route) to count requests within a sliding window.
 * This resets on server restart — suitable for Next.js serverless/dev.
 * For production at scale, swap the Map for a Redis store.
 */

const store = new Map();

// Clean up expired entries every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 5 * 60 * 1000);
}

/**
 * Check and increment rate limit for a given key.
 * @param {string} key       - unique key e.g. `login:192.168.1.1`
 * @param {number} limit     - max requests allowed in window
 * @param {number} windowMs  - time window in milliseconds
 * @returns {{ limited: boolean, retryAfter?: number }}
 */
export function rateLimit(key, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
  }

  entry.count += 1;
  store.set(key, entry);

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { limited: true, retryAfter };
  }

  return { limited: false };
}

/**
 * Get client IP from a Next.js Request object.
 * Checks X-Forwarded-For (Vercel/proxies) then falls back to a placeholder.
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
