import {
  FilledTextFieldProps,
  TextField,
  TextFieldProps,
  styled
} from '@mui/material';
import { ReactNode } from 'react';
export interface InputComponentProps
  extends Omit<FilledTextFieldProps, 'variant'> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  variant: string;
  textAlign?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  startContent,
  endContent,
  variant = 'filled',
  textAlign = 'start',
  ...FilledTextFieldProps
}) => {
  const CustomInput = styled((props: TextFieldProps) => (
    <TextField {...props} />
  ))(({ theme }) => ({
    '& .MuiInputBase-input': {
      textAlign: textAlign
    },
    '& .MuiFilledInput-root': {
      overflow: 'hidden',
      borderRadius: 12,
      backgroundColor: theme.palette.offWhite.main,
      border: 0,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),

      '& .MuiFilledInput-input': {
        paddingTop: label ? '26px' : '8px'
      }
    }
  }));
  return (
    <CustomInput
      {...FilledTextFieldProps}
      placeholder={placeholder}
      label={label}
      variant={variant}
      fullWidth
      InputProps={{
        startAdornment: startContent,
        endAdornment: endContent,
        disableUnderline: true
      }}
    />
  );
};
export default InputComponent;
