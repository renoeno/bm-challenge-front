import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface UserData {
  id: string;
  name: string;
  email: string;
  [key: string]: any; 
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const response = await fetch('https://your-actual-api.com/api/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { message: 'Invalid or expired session' },
        { status: 401 }
      );
    }
    
    const userData: UserData = await response.json();
    
    return NextResponse.json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Authentication check failed' },
      { status: 500 }
    );
  }
}