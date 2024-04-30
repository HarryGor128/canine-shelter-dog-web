import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, CSSProperties } from 'react';

type TextInputProps = {
    label: string;
    onInputText: (text: string) => void;
    isRequired?: boolean;
    placeHolder?: string;
    style?: CSSProperties;
    error?: boolean;
    isSecret?: boolean;
} & TextFieldProps;

const TextInput = ({
    label,
    onInputText,
    isRequired,
    placeHolder,
    style,
    error,
    isSecret,
    ...props
}: TextInputProps) => {
    const input = (
        change: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onInputText(change.target.value);
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
            {...props}
        />
    );
};

export default TextInput;
