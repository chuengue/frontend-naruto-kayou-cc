'use client';
import { api } from '@/services/api';
import { SignInService } from '@/services/loginService';
import { ErrorResponse } from '@/types/Error.types';
import { Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { createContext, useState } from 'react';
import { AuthContextInterface, SignData, User } from './authContext.types';

export const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);

  const isAuthenticated = !!userData;

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
      console.log(data);
      // router.replace('/register');
    },
    onError: (error: ErrorResponse) => {
      enqueueSnackbar(
        <Typography>{error.response.data.error.message}</Typography>,
        {
          variant: 'error'
        }
      );

      console.log(error.response.data.error.message);
    }
  });

  const isLoading = mutation.isPending;

  const signIn = async ({ identifier, password }: SignData): Promise<void> => {
    mutation.mutate({ identifier, password });
  };

  return (
    <AuthContext.Provider
      value={{ userData, signIn, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
