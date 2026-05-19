import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const protectedUserRoutes = ["/cart", "/checkout", "/orders", "/profile"];
const adminRoutes = ["/admin"];
const guestOnlyRoutes = [
  "/accounts/login",
  "/accounts/register",
  "/accounts/forgot-password",
];

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

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/accounts/login", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect user routes
  if (protectedUserRoutes.some((r) => pathname.startsWith(r))) {
    if (!user) {
      const loginUrl = new URL("/accounts/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from guest-only pages
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
