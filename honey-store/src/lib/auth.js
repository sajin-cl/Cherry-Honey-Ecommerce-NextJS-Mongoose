/**
 * Server-side auth helpers.
 * Call only in Server Components or Route Handlers (Node.js runtime).
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";


/** Returns decoded JWT payload or null */
export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

/** Redirects to login if no valid session */
export async function requireUser() {
  const user = await getServerUser();
  if (!user) redirect("/accounts/login");
  return user;
}

/** Redirects to home if not admin */
export async function requireAdmin() {
  const user = await getServerUser();
  if (!user || user.role !== "admin") redirect("/");
  return user;
}
