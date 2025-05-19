import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = ['/account']
const publicRoutes = ['/login', '/signup', '/']

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value;
  
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  
  if (authToken && (
    request.nextUrl.pathname === '/login' || 
    request.nextUrl.pathname === '/signup'
  )) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }