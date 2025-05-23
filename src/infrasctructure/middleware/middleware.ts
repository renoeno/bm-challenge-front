import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = ['/account'];

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    refreshToken &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
