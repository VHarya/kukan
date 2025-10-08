import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const guestPaths = ["/login", "/register"];
  const requestPathname = request.nextUrl.pathname;

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie && !guestPaths.includes(requestPathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (sessionCookie && guestPaths.includes(requestPathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
