import dayjs, { Dayjs } from "dayjs";

export const now = (): Dayjs => dayjs();
export const parseDate = (date: Date): Dayjs => dayjs(date);