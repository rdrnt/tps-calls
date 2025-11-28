import {
  format,
  setHours,
  setMinutes,
  differenceInHours,
  formatDistanceToNow,
  isToday,
} from 'date-fns';
import { Timestamp } from './firebase';
import { Timestamp as TimestampClass } from 'firebase/firestore';

export const convertTimestampToDate = (timestamp: Timestamp): Date =>
  timestamp.toDate();

export const convertDateToTimestamp = (date: Date): Timestamp =>
  TimestampClass.fromDate(date);

export const now = (): Timestamp => TimestampClass.now();

export const formatIncidentDate = (incidentTimestamp: Timestamp) => {
  const timestampToDate = convertTimestampToDate(incidentTimestamp);

  if (isToday(timestampToDate)) {
    return `Today @ ${format(timestampToDate, 'h:mm a')}`;
  }

  return format(timestampToDate, 'MMM Do yyyy @ h:mma');
};

export const createDateWithHoursAndMinutes = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => setHours(setMinutes(new Date(), minutes), hours);

export const compareHourDifference = (
  firstDate: Timestamp,
  secondDate: Timestamp
): number =>
  differenceInHours(
    convertTimestampToDate(firstDate),
    convertTimestampToDate(secondDate)
  );

export const distanceInWords = (timestamp: Timestamp): string =>
  formatDistanceToNow(convertTimestampToDate(timestamp));
