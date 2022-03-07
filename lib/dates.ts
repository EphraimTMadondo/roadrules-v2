import dayjs from 'dayjs';

export function minusWeeksFromDate(date: Date, numWeeks: number) {
  return dayjs(date).subtract(numWeeks, 'week').toDate();
}
