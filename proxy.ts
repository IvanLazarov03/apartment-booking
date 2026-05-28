import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const protectedRoutes = [
    "/admin/dashboard",
    "/admin/bookings",
    "/admin/blocked-dates",
  ];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const isLoggedIn =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
