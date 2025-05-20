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
    // Handle token refresh here if needed
    throw new Error('Unauthorized');
  }

  return response;
};
