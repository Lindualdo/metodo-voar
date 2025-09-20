import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define protected routes
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard') ||
                          nextUrl.pathname.startsWith('/analise') ||
                          nextUrl.pathname.startsWith('/audios') ||
                          nextUrl.pathname.startsWith('/metas') ||
                          nextUrl.pathname.startsWith('/settings') ||
                          nextUrl.pathname.startsWith('/relatorios');

  // Define auth routes
  const isAuthRoute = nextUrl.pathname.startsWith('/login') ||
                     nextUrl.pathname.startsWith('/register') ||
                     nextUrl.pathname.startsWith('/forgot-password');

  // If accessing auth routes while logged in, redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // If accessing protected routes while not logged in, redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = nextUrl.pathname;
    const loginUrl = new URL('/login', nextUrl);

    if (callbackUrl !== '/dashboard') {
      loginUrl.searchParams.set('callbackUrl', callbackUrl);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};