import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ButtonComponentProps } from './button.types';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  isLoading = false,
  titleSize,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={buttonProps.disabled || isLoading}
      color={buttonProps.color ?? 'primary'}
      variant={buttonProps.variant ?? 'contained'}
      sx={{ borderRadius: 2 }}
    >
      <Stack direction={'row'} alignItems="center">
        {isLoading && (
          <CircularProgress
            size={22}
            sx={children ? { mr: 1 } : { mr: 0 }}
            color={!buttonProps.disabled ? 'inherit' : 'primary'}
          ></CircularProgress>
        )}
        <div style={{ paddingTop: '4px', paddingBottom: '4px' }}>
          <Typography fontSize={titleSize ?? titleSize} fontWeight={600}>
            {children}
          </Typography>
        </div>
      </Stack>
    </Button>
  );
};

export default ButtonComponent;
