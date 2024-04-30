import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

export interface RadioButtonOption {
    value: string;
    label: string;
}

interface RadioButtonProps {
    label: string;
    option: RadioButtonOption[];
    onChangeValue: (value: string) => void;
    defaultValue?: string;
    row?: boolean;
    disabled?: boolean;
    isRequired?: boolean;
    error?: boolean;
}

const RadioButton = ({
    label,
    option,
    onChangeValue,
    defaultValue,
    row,
    disabled,
    isRequired,
    error,
}: RadioButtonProps) => {
    return (
        <FormControl error={error}>
            <FormLabel>{`${label} ${isRequired ? '*' : ''}`}</FormLabel>
            <RadioGroup
                defaultValue={defaultValue}
                row={row}
                onChange={(_, value) => onChangeValue(value)}
            >
                {option.map((item, index) => (
                    <FormControlLabel
                        key={index}
                        disabled={disabled}
                        control={<Radio />}
                        {...item}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButton;
