import { DateTime } from 'luxon';
import DateFormat from './DateFormat';

const dateConvert = {
    today() {
        return DateTime.now().toFormat(DateFormat.YYYYMMDD);
    },

    now() {
        return DateTime.now();
    },

    dateStringToUnixTime(dateString: string, format: keyof typeof DateFormat) {
        return DateTime.fromFormat(dateString, format).toUnixInteger();
    },

    unixTimeToDateString(
        unixTime: number,
        format: keyof typeof DateFormat = 'YYYYMMDD',
    ) {
        return DateTime.fromMillis(unixTime).toFormat(format);
    },

    getAge(date: string | number) {},
};

export default dateConvert;
