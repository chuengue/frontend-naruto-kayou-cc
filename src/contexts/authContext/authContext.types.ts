import { User } from '@/types/User.types';

export interface SignData {
  identifier: string;
  password: string;
}
export interface AuthContextInterface {
  userData: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (data: SignData) => Promise<void>;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface UserResponse {
  success: boolean;
  results: AuthResponse;
}
