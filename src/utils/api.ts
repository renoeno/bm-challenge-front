import { useAuth } from '@/contexts/AuthContext';

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
) => {
  const { user } = useAuth();

  const headers = {
    'Content-Type': 'application/json',
    ...(user?.accessToken && { Authorization: `Bearer ${user.accessToken}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  return response;
};

export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const { user } = useAuth();

  if (!user || !user.accessToken) {
    throw new Error('Authentication required');
  }

  if (user.role !== 'ADMIN') {
    throw new Error('Admin privileges required');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.accessToken}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden: Insufficient permissions');
  }

  return response;
};
