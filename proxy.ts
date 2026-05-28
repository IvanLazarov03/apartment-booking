// proxy.ts (middleware)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page without restriction
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Define protected admin routes
  const protectedRoutes = [
    "/admin/dashboard",
    "/admin/bookings",
    "/admin/blocked-dates",
  ];

  // Check if current path is one of the protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const isLoggedIn = req.cookies.get("auth"); // replace with your auth cookie/session

    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
