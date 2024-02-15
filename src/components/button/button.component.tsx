import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ButtonComponentProps } from './button.types';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  isLoading = false,
  color = 'primary',
  titleSize,
  rounded = false,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={buttonProps.disabled || isLoading}
      color={color}
      variant={buttonProps.variant ?? 'contained'}
      sx={{ borderRadius: rounded ? '25px' : 2 }}
    >
      <Stack direction={'row'} alignItems="center">
        {isLoading && (
          <CircularProgress
            size={22}
            sx={children ? { mr: 1 } : { mr: 0 }}
            color={!buttonProps.disabled ? 'inherit' : 'primary'}
          ></CircularProgress>
        )}
        <div style={{ padding: '4px' }}>
          <Typography
            fontSize={titleSize ?? titleSize}
            fontWeight={600}
            color={color === 'primary' ? '#fff' : 'primary'}
          >
            {children}
          </Typography>
        </div>
      </Stack>
    </Button>
  );
};

export default ButtonComponent;
