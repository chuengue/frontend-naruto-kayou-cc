'use client';
import Button from '@/components/button';
import ModalComponent from '@/components/modal/modal.component';
import { UseAuth } from '@/contexts/authContext/authContext';
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
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const t = useTranslations('login');
  const tError = useTranslations('validationInputError');

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const { signIn, isLoading } = UseAuth();
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignIn = ({ identifier, password }: SignData) => {
    signIn({ identifier, password });
  };

  //TODO SERA FUNÇÃO DE FEEDBACK, FORGOT PASSWORD NAO IMPLEMENTADO NA API
  const forgotPassword = () => {
    handleOpen();
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        title="Função em desenvolvimento"
      >
        <Box width={400}>
          <Typography>{t('temporaryModalForgotPassword')}</Typography>
        </Box>
      </ModalComponent>
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
                  label={t('inputLabelEmail')}
                  autoComplete="nickname"
                  inputProps={{ ...register('identifier') }}
                  error={!!errors.identifier}
                  helperText={
                    errors.identifier
                      ? tError(errors.identifier?.message)
                      : null
                  }
                ></TextField>

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label={t('inputLabelPassword')}
                  autoComplete="current-password"
                  inputProps={{ ...register('password') }}
                  error={!!errors.password}
                  helperText={
                    errors.password ? tError(errors.password?.message) : null
                  }
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
                <Button
                  onClick={forgotPassword}
                  titleSize={13}
                  styled="textButtonStyle"
                >
                  {t('forgotPassword')}
                </Button>
              </Stack>
            </Box>

            <Stack direction="column" spacing={20} mt={6}>
              <Button
                type="submit"
                isLoading={isLoading}
                styled="containedStyle"
              >
                {t('signInBtn')}
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2.1}
                justifyContent="center"
              >
                <Typography variant="caption">
                  {t('signUpDescription')}
                </Typography>
                <Link href={'/register'}>
                  <Button titleSize={13} styled="textButtonStyle">
                    {t('signUpBtn')}
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Paper>
        </form>
      </Box>
    </>
  );
}
