'use client';
import { TextField, TextFieldProps, styled } from '@mui/material';
import { ReactNode, forwardRef } from 'react';

export interface InputComponentProps extends Omit<TextFieldProps, 'ref'> {
  label?: string;
  placeholder: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  textAlign?: string;
}

const CustomInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {},
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
      paddingTop: '8px'
    },
    '&:focus': {
      // Estilizando o estado de foco
      backgroundColor: 'transparent !important' // Defina o estilo desejado ao ser clicado
    }
  }
}));

const InputComponent = forwardRef<HTMLDivElement, InputComponentProps>(
  function InputComponent(
    {
      label,
      placeholder,
      startContent,
      endContent,
      value,
      onChange,
      name,
      textAlign = 'start',
      ...FilledTextFieldProps
    },
    ref
  ) {
    return (
      <CustomInput
        {...FilledTextFieldProps}
        placeholder={placeholder}
        label={label}
        variant="filled"
        fullWidth
        inputRef={ref}
        InputProps={{
          startAdornment: startContent,
          endAdornment: endContent,
          onChange: onChange,
          value: value,
          name: name,
          disableUnderline: true
        }}
      />
    );
  }
);

InputComponent.displayName = 'InputComponent';

export default InputComponent;
