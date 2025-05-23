import { API_URL } from '@/config/api';
import { User } from '@/types/types';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];

    // If we have an access token, try to validate it first
    if (accessToken) {
      const validateResponse = await fetch(`${API_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (validateResponse.ok) {
        const userData = await validateResponse.json();
        return NextResponse.json({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      }
    }

    // If we don't have a refresh token, return unauthorized
    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 },
      );
    }

    // Try to refresh the token
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) {
      return NextResponse.json(
        { message: 'Invalid or expired session' },
        { status: 401 },
      );
    }

    const { accessToken: newAccessToken, user: userData } = await refreshResponse.json();

    return NextResponse.json(
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      },
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Authentication check failed' },
      { status: 500 },
    );
  }
}