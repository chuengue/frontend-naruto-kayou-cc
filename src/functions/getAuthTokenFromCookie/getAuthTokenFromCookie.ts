import { getCookie } from 'cookies-next';

export function getAuthTokenFromCookie(): string | null {
  const token = getCookie('authToken');
  if (token) return token;
  return null;
}
