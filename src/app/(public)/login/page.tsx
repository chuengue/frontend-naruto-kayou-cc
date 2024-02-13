'use client';
import Button from '@/components/button';
import { SignData } from '@/contexts/authContext/authContext.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/authContext/authContext';
import { LoginFormData } from './login.types';
import { loginSchema } from './zodSchemas';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, isLoading } = useContext(AuthContext);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignIn = ({ identifier, password }: SignData) => {
    signIn({ identifier, password });
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
        <form onSubmit={handleSubmit(data => handleSignIn(data))}>
          <Paper
            elevation={2}
            sx={{
              padding: 4,
              borderRadius: 2.5,
              width: 'auto',
              height: 'auto'
            }}
          >
            <Box sx={{ width: { xs: '300px', lg: '400px' } }}>
              <Stack alignItems="center" sx={{ py: 8 }}>
                <img src="/assets/logo.png" width={100} height={40} />
              </Stack>
              <Stack id="inputs" spacing={2}>
                <TextField
                  type="text"
                  label="E-mail ou nome de usuário"
                  autoComplete="nickname"
                  inputProps={{ ...register('identifier') }}
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                ></TextField>

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  autoComplete="current-password"
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
              </Stack>
              <Stack direction="row-reverse" mt={2}>
                <Button variant="text" titleSize={13} color="secondary">
                  Esqueceu a senha ?
                </Button>
              </Stack>
            </Box>

            <Stack direction="column" spacing={20} mt={6}>
              <Button type="submit" isLoading={isLoading}>
                Entrar
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2.1}
                justifyContent="center"
              >
                <Typography variant="caption">Ainda não tem conta?</Typography>
                <Button titleSize={13} variant="text" color="secondary">
                  Registre-se
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </form>
      </Box>
    </>
  );
}
