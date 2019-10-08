import { format } from 'date-fns';
import firebase from 'firebase/app';

export const convertTimestampToDate = (
  timestamp: firebase.firestore.Timestamp
): Date => timestamp.toDate();

export const convertDateToTimestamp = (
  date: Date
): firebase.firestore.Timestamp => firebase.firestore.Timestamp.fromDate(date);

export const now = (): firebase.firestore.Timestamp =>
  firebase.firestore.Timestamp.now();

export const formatIncidentDate = (
  incidentTimestamp: firebase.firestore.Timestamp
) => {
  const timestampToDate = convertTimestampToDate(incidentTimestamp);
  return format(timestampToDate, 'MMM Do YYYY @ h:mma');
};
