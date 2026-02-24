import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getFormattedDate = (date: string) => {
    const createdAtUTC = date;

    const utcDayjs = dayjs.utc(createdAtUTC);

    const localDayjs = utcDayjs.tz('Asia/Dhaka');

    const format = localDayjs.format('MMMM D, YYYY h:mm A'); 

    return format;
}


