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
}

const RadioButton = ({
    label,
    option,
    onChangeValue,
    defaultValue,
    row,
    disabled,
}: RadioButtonProps) => {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                defaultValue={defaultValue}
                row={row}
                onChange={(_, value) => onChangeValue(value)}
            >
                {option.map((item) => (
                    <FormControlLabel
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
