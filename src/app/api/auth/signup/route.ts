import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

interface SignupApiResponse {
    email: string;
    accessToken: string;
    refreshToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequestBody = await request.json();
    const cookieStore = await cookies()
    
    if (!body.email || !body.name || !body.password) {
      return NextResponse.json(
        { message: 'Email, name and password are required' },
        { status: 400 }
      );
    }

    const API_URL = 'http://localhost:3005'
    
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email, name: body.name, password: body.password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Invalid credentials' },
        { status: response.status }
      );
    }

    const data: SignupApiResponse = await response.json();
    
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    return NextResponse.json(
      { email: data.email, accessToken: data.accessToken },
      { 
        status: 201,
        headers: {
          'Authorization': `Bearer ${data.accessToken}`
        }
      }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}