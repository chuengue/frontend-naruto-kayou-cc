import { User } from '@/types/User.types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export interface SignData {
  identifier: string;
  password: string;
}
export interface AuthContextInterface {
  userData: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  getUserFetchStatus: 'error' | 'success' | 'pending';
  getUserFetchLoading: boolean;
  signIn: (data: SignData) => Promise<void>;
  signOut: () => void;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<WhoamiResponse, Error>>;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface UserResponse {
  success: boolean;
  results: AuthResponse;
}
export interface WhoamiResponse {
  success: boolean;
  results: User;
}
