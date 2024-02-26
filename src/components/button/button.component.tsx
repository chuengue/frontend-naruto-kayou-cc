import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ButtonComponentProps } from './button.types';

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  isLoading = false,
  titleSize,
  rounded = false,
  styled = 'containedStyle',
  color,
  customStyles,
  ...buttonProps
}) => {
  const outlinedStyle = {
    borderRadius: rounded ? '25px' : 2,
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: color ? color : 'primary.main',
    color: 'offWhite.secondary'
  };
  const textButtonStyle = {
    backgroundColor: 'transparent',
    color: 'secondary.main',
    borderRadius: rounded ? '25px' : 2
  };

  const containedStyle = {
    borderRadius: rounded ? '25px' : 2,
    backgroundColor: color ? color : 'primary.main',
    color: 'offWhite.main',
    ':hover': {
      backgroundColor: 'primary.light'
    }
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
      sx={{ ...handleStyled(styled as string), ...customStyles }}
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
