'use client';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
      <Box>{t('title')}</Box>
    </>
  );
}
