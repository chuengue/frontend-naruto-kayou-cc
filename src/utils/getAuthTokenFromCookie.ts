import { getCookie } from 'cookies-next';

export function getAuthTokenFromCookie(): string | null {
  const token = getCookie('authToken');
  console.log(token);
  if (token) return token;
  return null;
}
