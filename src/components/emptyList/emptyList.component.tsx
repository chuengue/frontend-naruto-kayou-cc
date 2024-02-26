import { SentimentDissatisfied } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

export interface EmptyListProps {
  message: string;
}
function EmptyList({ message }: EmptyListProps) {
  return (
    <Stack
      sx={{
        textAlign: 'center',
        mt: 4,
        backgroundColor: 'offWhite.main',
        height: '300px',
        borderRadius: '24px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SentimentDissatisfied fontSize="large" color="disabled" />
      <Typography variant="body1" color="textSecondary" mt={2}>
        {message}
      </Typography>
    </Stack>
  );
}

export default EmptyList;
