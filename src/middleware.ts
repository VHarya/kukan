import { NextRequest, NextResponse } from "next/server";
import { auth } from "./libs/auth";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  const guestPaths = ["/login", "/register"];
  const requestPathname = request.nextUrl.pathname;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("session: ", session);
  if (!session?.user && !guestPaths.includes(requestPathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (session?.user && guestPaths.includes(requestPathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
