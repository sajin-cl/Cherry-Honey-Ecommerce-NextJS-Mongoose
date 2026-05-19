/**
 * Edge-compatible JWT using the Web Crypto API.
 * Works in Next.js middleware (Edge runtime) AND Node.js API routes.
 */

const SECRET = process.env.JWT_SECRET;

function enc(str) {
  return new TextEncoder().encode(str);
}

function b64urlEncode(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

async function importKey(usage) {
  return crypto.subtle.importKey(
    "raw",
    enc(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

/**
 * Sign a JWT payload. Returns a token string.
 * @param {object} payload
 * @param {number} expiresInSec  default 7 days
 */
export async function signToken(payload, expiresInSec = 7 * 24 * 3600) {
  const header = b64urlEncode(enc(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const claims = { ...payload, iat: now, exp: now + expiresInSec };
  const body = b64urlEncode(enc(JSON.stringify(claims)));
  const key = await importKey("sign");
  const sig = await crypto.subtle.sign("HMAC", key, enc(`${header}.${body}`));
  return `${header}.${body}.${b64urlEncode(sig)}`;
}

/**
 * Verify a JWT token. Returns the decoded payload.
 * Throws if invalid or expired.
 * @param {string} token
 */
export async function verifyToken(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [header, body, sig] = parts;

  const key = await importKey("verify");
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    b64urlDecode(sig),
    enc(`${header}.${body}`)
  );
  if (!valid) throw new Error("Invalid token signature");

  const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }
  return payload;
}
