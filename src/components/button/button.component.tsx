import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ButtonComponentProps } from './button.types';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  isLoading = false,
  titleSize,
  rounded = false,
  styled,
  ...buttonProps
}) => {
  const outlinedStyle = {
    borderRadius: rounded ? '25px' : 2,
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: 'primary.main',
    color: 'offWhite.secondary'
  };
  const textButtonStyle = {
    backgroundColor: 'transparent',
    color: 'secondary.main'
  };

  const containedStyle = {
    borderRadius: rounded ? '25px' : 2,
    backgroundColor: 'primary.main',
    color: 'offWhite.main'
  };
  const handleStyled = (style: string) => {
    switch (style) {
      case 'containedStyle':
        return containedStyle;
      case 'textButtonStyle':
        return textButtonStyle;
      case 'OutlinedStyle':
        return outlinedStyle;

      default:
        containedStyle;
    }
  };
  return (
    <Button
      {...buttonProps}
      disabled={buttonProps.disabled || isLoading}
      sx={handleStyled(styled as string)}
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
          <Typography fontSize={titleSize ?? titleSize} fontWeight={600}>
            {children}
          </Typography>
        </div>
      </Stack>
    </Button>
  );
};

export default ButtonComponent;
