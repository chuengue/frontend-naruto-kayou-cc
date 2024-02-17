'use client';
import useSnackbarHandler from '@/hooks/useSnackbarHandler';
import { api } from '@/services/api';
import {
  SignInService,
  whoamiService
} from '@/services/requests/signIn/signInService';
import { ErrorResponse } from '@/types/Error.types';
import { User } from '@/types/User.types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { AuthContextInterface, SignData } from './authContext.types';
export const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }) => {
  const { showErrorSnackbar } = useSnackbarHandler();
  const { replace, push } = useRouter();
  const queryClient = new QueryClient();

  const [userData, setUserData] = useState<User | null>(null);
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(false);

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
      SetIsAuthenticated(true);
      setUserData(results?.user as User);
      api.defaults.headers['Authorization'] =
        `Bearer ${data?.results.accessToken}`;

      replace('/home');
    },
    onError: (error: ErrorResponse) => {
      showErrorSnackbar(error.response.data.error.message);
    }
  });

  const {
    data: UserDataUpdated,
    refetch: refetchUser,
    isError,
    error,
    isSuccess,
    isLoading: getUserFetchLoading,
    status: getUserFetchStatus
  } = useQuery({
    queryKey: ['userData'],
    queryFn: () => whoamiService(api),
    enabled: hasAuthToken,
    retry: false,
    staleTime: 60 * 60 * 5 //3 Minutes
  });
  const signOut = useCallback(() => {
    deleteCookie('authToken');
    SetIsAuthenticated(false);
    queryClient.invalidateQueries();
    push('/home');
  }, [queryClient, SetIsAuthenticated, isAuthenticated]);

  const handleUserDataUpdate = useCallback(() => {
    const UpdatedAuthToken = hasCookie('authToken');

    if (UpdatedAuthToken) {
      const userDataResponse: User = UserDataUpdated?.results as User;
      setUserData(userDataResponse);
      if (isSuccess) {
        SetIsAuthenticated(true);
      } else if (isError) {
        const errorCode = error.response.data.error.code;
        if (errorCode === 1010) {
          showErrorSnackbar('Sessão Expirada. Faça Login Novamente!');
        }
        signOut();
      }
    }
  }, [UserDataUpdated, showErrorSnackbar, isError, isSuccess, signOut, error]);

  useEffect(() => {
    handleUserDataUpdate();
  }, [handleUserDataUpdate]);

  const isLoading = mutation.isPending;

  const signIn = async ({ identifier, password }: SignData): Promise<void> => {
    mutation.mutate({ identifier, password });
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        isLoading,
        isAdmin,
        isSuperAdmin,
        getUserFetchStatus,
        getUserFetchLoading,
        signIn,
        refetchUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
