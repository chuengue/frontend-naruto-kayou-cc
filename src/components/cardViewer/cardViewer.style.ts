import { IconButton, styled } from '@mui/material';
import theme from '../../../theme/theme';

export const StyledIconButton = styled(IconButton)(() => ({
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main
  }
}));

export const BoxStyled = {
  display: 'inline-block',
  p: 1,
  borderRadius: '16px',
  m: 1,
  border: '1px solid ',
  borderColor: 'offWhite.light'
};
