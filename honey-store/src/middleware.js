import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const protectedUserRoutes = ["/cart", "/checkout", "/orders", "/profile"];
const guestOnlyRoutes = [
  "/accounts/login",
  "/accounts/register",
  "/accounts/forgot-password",
];

// Pages that admin should NOT access (redirect them to dashboard instead)
const userOnlyRoutes = ["/", "/cart", "/checkout", "/orders", "/profile", "/products", "/accounts"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  let user = null;
  if (token) {
    try {
      user = await verifyToken(token);
    } catch {
      // Invalid / expired token — treat as logged-out
    }
  }

  // ── Admin route protection ──────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/accounts/login", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Admin is authorised — let through
    return NextResponse.next();
  }

  // ── Redirect admin away from user-facing pages → dashboard ──────
  if (user?.role === "admin") {
    // Admin should always be in the admin panel
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // ── Protect user-only routes ────────────────────────────────────
  if (protectedUserRoutes.some((r) => pathname.startsWith(r))) {
    if (!user) {
      const loginUrl = new URL("/accounts/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Redirect logged-in users away from guest-only pages ─────────
  if (guestOnlyRoutes.some((r) => pathname.startsWith(r))) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
