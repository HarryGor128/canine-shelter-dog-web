import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import DropDownListOption from './DropDownListOption';

interface DropDownListProps {
    label: string;
    optionList: DropDownListOption[];
    onSelectOption: (value: string) => void;
    defaultValue?: string;
    disabled?: boolean;
    isRequired?: boolean;
    error?: boolean;
    width?: number;
}

const DropDownList = ({
    label,
    optionList,
    onSelectOption,
    defaultValue,
    disabled,
    isRequired,
    error,
    width = 200,
}: DropDownListProps) => {
    const onSelect = (event: SelectChangeEvent<string>) => {
        onSelectOption(event.target.value as string);
    };

    return (
        <FormControl required={isRequired}>
            <InputLabel id='dropDownLabel'>{label}</InputLabel>
            <Select
                labelId={'dropDownLabel'}
                label={label}
                disabled={disabled}
                defaultValue={defaultValue}
                onChange={onSelect}
                required={isRequired}
                error={error}
                sx={{ minWidth: width }}
            >
                {optionList.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDownList;
