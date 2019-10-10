import { format, setHours, setMinutes, differenceInHours } from 'date-fns';
import firebase from 'firebase/app';

export type Timestamp = firebase.firestore.Timestamp;

export const convertTimestampToDate = (timestamp: Timestamp): Date =>
  timestamp.toDate();

export const convertDateToTimestamp = (date: Date): Timestamp =>
  firebase.firestore.Timestamp.fromDate(date);

export const now = (): Timestamp => firebase.firestore.Timestamp.now();

export const formatIncidentDate = (incidentTimestamp: Timestamp) => {
  const timestampToDate = convertTimestampToDate(incidentTimestamp);
  return format(timestampToDate, 'MMM Do YYYY @ h:mma');
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
