import { DateTime } from "luxon";

function toFormat(date: string, format = "dd/MM/yyyy") {
  return DateTime.fromISO(date).toUTC().toFormat(format);
}

function isoToTimestamp(iso8601Date: string) {
  return DateTime.fromISO(iso8601Date).toMillis();
}

function secToDays(secs: number) {
  const segundosEmUmDia = 86400;
  return secs / segundosEmUmDia;
}

function timestampUntil(dateString: string | number) {
  const now = new Date();
  if (!dateString) return;
  const targetDate = new Date(dateString);
  const differenceInMilliseconds = targetDate.getTime() - now.getTime();
  return differenceInMilliseconds;
}

function timestampToDate(timestamp: number) {
  const days = Math.floor(timestamp / (24 * 3600));
  const remainingAfterDays = timestamp % (24 * 3600);
  const hours = Math.floor(remainingAfterDays / 3600);
  const remainingAfterHours = remainingAfterDays % 3600;
  const minutes = Math.floor(remainingAfterHours / 60);
  const seconds = remainingAfterHours % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function dateToTimestamp() {
  return Math.floor(new Date("2024-05-05").getTime() / 1000);
}

export const DateFormat = {
  toFormat,
  isoToTimestamp,
  secToDays,
  timestampUntil,
  timestampToDate,
  dateToTimestamp,
};
