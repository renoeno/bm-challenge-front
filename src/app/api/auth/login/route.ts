import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginApiResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
  role: 'ADMIN' | 'USER';
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();
    const cookieStore = await cookies();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const API_URL = 'http://localhost:3005';

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const data: LoginApiResponse = await response.json();

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return NextResponse.json(
      { email: data.email, accessToken: data.accessToken, role: data.role },
      {
        status: 201,
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 },
    );
  }
}
