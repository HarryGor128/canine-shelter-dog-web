import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, CSSProperties } from 'react';

interface TextInputProps {
    label: string;
    onInput: (text: string) => void;
    isRequired?: boolean;
    placeHolder?: string;
    style?: CSSProperties;
    error?: boolean;
    isSecret?: boolean;
    muiTextFieldProps?: TextFieldProps;
}

const TextInput = ({
    label,
    onInput,
    isRequired,
    placeHolder,
    style,
    error,
    isSecret,
    muiTextFieldProps,
}: TextInputProps) => {
    const input = (
        change: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onInput(change.target.value);
    };

    return (
        <TextField
            required={isRequired}
            label={label}
            onChange={input}
            placeholder={placeHolder}
            style={style}
            error={error}
            type={isSecret ? 'password' : undefined}
            {...muiTextFieldProps}
        />
    );
};

export default TextInput;
