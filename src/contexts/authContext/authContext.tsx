'use client';
import useSnackbarHandler from '@/hooks/useSnackbarHandler';
import { api } from '@/services/api';
import {
  SignInService,
  whoamiService
} from '@/services/requests/signIn/signInService';
import { ErrorResponse } from '@/types/Error.types';
import { User } from '@/types/User.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { AuthContextInterface, SignData } from './authContext.types';

export const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }) => {
  const { showErrorSnackbar } = useSnackbarHandler();
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);

  const isAuthenticated = !!userData;

  const isAdmin = userData?.roles?.includes('admin') || false;
  const isSuperAdmin = userData?.roles?.includes('super_admin') || false;

  const hasAuthToken = hasCookie('authToken');

  const mutation = useMutation({
    mutationFn: ({ identifier, password }: SignData) => {
      return SignInService(api, { identifier, password });
    },
    onSuccess: data => {
      const results = data?.results;

      setCookie('authToken', results?.accessToken, {
        maxAge: 60 * 60 * 24 // 24 Hours
      });

      setUserData(results?.user as User);

      api.defaults.headers['Authorization'] =
        `Bearer ${data?.results.accessToken}`;

      router.replace('/register');
    },
    onError: (error: ErrorResponse) => {
      showErrorSnackbar(error.response.data.error.message);
    }
  });

  const { data: UserDataUpdated, refetch: refetchUser } = useQuery({
    queryKey: ['userData'],
    queryFn: () => whoamiService(api),
    enabled: hasAuthToken
  });

  useEffect(() => {
    const UpdatedAuthToken = hasCookie('authToken');

    if (UpdatedAuthToken) {
      setUserData(UserDataUpdated?.results as User);
    }
  }, [UserDataUpdated]);

  const isLoading = mutation.isPending;

  const signIn = async ({ identifier, password }: SignData): Promise<void> => {
    mutation.mutate({ identifier, password });
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        signIn,
        isAuthenticated,
        isLoading,
        refetchUser,
        isAdmin,
        isSuperAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
