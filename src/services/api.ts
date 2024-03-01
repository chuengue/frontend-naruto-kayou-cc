import { getAuthTokenFromCookie } from '@/functions';
import axios from 'axios';
export const BASE_URL = 'http://localhost:3333/api';
const token = getAuthTokenFromCookie();
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
