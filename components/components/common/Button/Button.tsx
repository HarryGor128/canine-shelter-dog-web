import {
    ButtonTypeMap,
    ExtendButtonBase,
    Button as MuiButton,
} from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
    onPress: Function;
    text: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    style?: CSSProperties;
    disabled?: boolean;
    variant?: 'text' | 'contained' | 'outlined';
    muiButtonProps?: ExtendButtonBase<ButtonTypeMap<{}, 'button'>>;
}

const Button = ({
    onPress,
    text,
    startIcon,
    endIcon,
    style,
    disabled,
    variant = 'contained',
    muiButtonProps,
}: ButtonProps) => {
    return (
        <MuiButton
            variant={variant}
            onClick={() => {
                onPress();
            }}
            startIcon={startIcon}
            endIcon={endIcon}
            style={style}
            disabled={disabled}
            {...muiButtonProps}
        >
            {text}
        </MuiButton>
    );
};

export default Button;
