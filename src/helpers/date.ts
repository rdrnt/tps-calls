import { format } from 'date-fns';
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
