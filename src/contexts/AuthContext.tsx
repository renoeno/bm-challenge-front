'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  accessToken?: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

// Define login credentials type
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (credentials: SignupCredentials) => Promise<User>;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const newAccessToken = response.headers.get('Authorization')?.split(' ')[1];
          
          // Store the new access token
          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
          }
          
          setUser({
            ...userData,
            accessToken: newAccessToken,
          });
        } else {
          setUser(null);
          localStorage.removeItem('accessToken');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to fetch user data');
        setUser(null);
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const signup = async (credentials: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const userData: User = await response.json();
      const accessToken = response.headers.get('Authorization')?.split(' ')[1];

      setUser({
        ...userData,
        accessToken,
      });
      router.refresh();
      return userData;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during signup');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const userData: User = await response.json();
      const accessToken = response.headers.get('Authorization')?.split(' ')[1];
  
      // Store the access token
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
  
      setUser({
        ...userData,
        accessToken,
      });
      
      router.refresh();
      return userData;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
      localStorage.removeItem('accessToken');
      router.refresh();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
