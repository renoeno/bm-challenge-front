import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginApiResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    [key: string]: any; 
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();
    const cookieStore = await cookies()
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch('https://your-actual-api.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const data: LoginApiResponse = await response.json();
    
    cookieStore.set({
      name: 'auth-token',
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return NextResponse.json({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}