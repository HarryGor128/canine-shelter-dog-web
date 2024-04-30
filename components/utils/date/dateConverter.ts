import { DateTime } from 'luxon';
import DateFormat from './DateFormat';

const dateConverter = {
    today() {
        return DateTime.now().toFormat(DateFormat.YYYYMMDD);
    },

    now() {
        return DateTime.now();
    },

    dateStringToUnixTime(dateString: string, format: DateFormat) {
        return DateTime.fromFormat(dateString, format).toSeconds();
    },

    unixTimeToDateString(
        unixTime: number,
        format: DateFormat = DateFormat.YYYYMMDD,
    ) {
        return DateTime.fromSeconds(unixTime).toFormat(format);
    },

    getAge(date: string | number, format: DateFormat = DateFormat.YYYYMMDD) {
        let birthDate;

        // Check if input is a number (Unix time) or a string (date string)
        if (typeof date === 'number') {
            // Unix time is in seconds
            birthDate = DateTime.fromSeconds(date);
        } else {
            birthDate = DateTime.fromFormat(date, format);
        }

        let now = DateTime.now();
        let age = now.diff(birthDate, 'years').years;

        // Round down the age
        let roundedAge = Math.floor(age);

        return roundedAge;
    },
};

export default dateConverter;
