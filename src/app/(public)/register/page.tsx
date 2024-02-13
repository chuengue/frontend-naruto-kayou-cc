'use client';
import Button from '@/components/button';
import useSnackbarHandler from '@/hooks/useSnackbarHandler';
import { api } from '@/services/api';
import { SignUpService } from '@/services/requests/signUp/signUpService';
import { ErrorResponse } from '@/types/Error.types';
import { SignUpInterface } from '@/types/SignUp.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from './zodSchemas';

export type LoginFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors }
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema)
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const { replace } = useRouter();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarHandler();
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { isPending, mutateAsync: signUpFn } = useMutation({
    mutationFn: ({ data }: { data: SignUpInterface }) =>
      SignUpService(api, { ...data }),
    onSuccess: () => {
      showSuccessSnackbar('Conta Criada');

      replace('login');
    },
    onError: (error: ErrorResponse) => {
      showErrorSnackbar(error.response.data.error.message);
    }
  });

  const matchPassword = () => {
    const password = getValues('password');
    console.log(password === confirmPassword);
    if (!(password === confirmPassword)) {
      setError('password', {
        type: 'matchPassword',
        message: 'As senhas precisam ser iguais'
      });
    }
  };

  return (
    <>
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        height="100vh"
        width="100vw"
        bgcolor="offWhite.main"
      >
        <form onSubmit={handleSubmit(data => signUpFn({ data }))}>
          <Paper
            elevation={2}
            sx={{
              padding: 4,
              borderRadius: 2.5,
              width: 'auto',
              height: 'auto'
            }}
          >
            <Box>
              <Stack alignItems="center" sx={{ py: 8 }}>
                <img src="/assets/logo.png" width={100} height={40} />
              </Stack>
              <Stack
                id="inputs"
                spacing={3}
                sx={{ width: { xs: '350px', lg: '400px' } }}
              >
                <TextField
                  type="email"
                  label="E-mail"
                  autoComplete="email"
                  inputProps={{ ...register('email') }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                ></TextField>
                <TextField
                  type="text"
                  label="Nome de usuário"
                  autoComplete="username"
                  inputProps={{ ...register('username') }}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                ></TextField>
                <TextField
                  type="text"
                  label="Nome"
                  autoComplete="given-name"
                  inputProps={{ ...register('firstName') }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                ></TextField>
                <TextField
                  type="text"
                  label="Sobrenome"
                  autoComplete="family-name"
                  inputProps={{ ...register('lastName') }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                ></TextField>
                <TextField
                  type="tel"
                  label="Telefone"
                  autoComplete="tel"
                  inputProps={{ ...register('phoneNumber') }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                ></TextField>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  autoComplete="new-password"
                  inputProps={{ ...register('password') }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                ></TextField>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Confirme a senha"
                  autoComplete="new-password"
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                  }}
                  onBlur={() => matchPassword()}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                ></TextField>
              </Stack>
            </Box>

            <Stack direction="column" spacing={20} pt={8}>
              <Button type="submit" isLoading={isPending}>
                Inscrever-se
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2.1}
                justifyContent="center"
              ></Stack>
            </Stack>
          </Paper>
        </form>
      </Box>
    </>
  );
}
