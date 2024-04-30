import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import dateConverter from '../../../utils/date/dateConverter';

interface DatePickerProps {
    label: string;
    onChange: (newDate: number) => void;
    value?: number; // Unix Time
    disabled?: boolean;
}

const DatePicker = ({
    label,
    value = dateConverter.dateObjToUnixTime(dateConverter.nowDateObj()),
    onChange,
    disabled,
}: DatePickerProps) => {
    const onChangeDate = (newDate: DateTime<true> | null) => {
        onChange(
            dateConverter.dateObjToUnixTime(
                newDate ? newDate : dateConverter.nowDateObj(),
            ),
        );
    };

    return (
        <MUIDatePicker
            label={label}
            value={dateConverter.unixTimeToDateObj(value)}
            onChange={onChangeDate}
            disabled={disabled}
        />
    );
};

export default DatePicker;
