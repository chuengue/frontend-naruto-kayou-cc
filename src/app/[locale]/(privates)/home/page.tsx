'use client';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('index.title');
  return (
    <>
      <Box>{t('title')}</Box>
    </>
  );
}
