import {format} from "date-fns";

export const DEFAULT_LANGUAGE = 'en';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const accessTokenName = 'UATFW';

export const utcDateFormatter = 'yyyy-MM-dd\'T\'HH:mm:ss';

export const DEFAULT_DATE_PICKER_PERIOD = {
    from: new Date(2023, 8, 17),
    to: new Date(2024, 8, 17),
}

const DEFAULT_DATE_FORMAT = 'HH:MM - dd/MM/yyyy';

export const dateFormatter = (date: string, formatType = DEFAULT_DATE_FORMAT)=> {
    return format(date, formatType)
}