import { format } from 'date-fns';

export const convertTimestampToDate = (
  timestamp: firebase.firestore.Timestamp
): Date => timestamp.toDate();

export const formatIncidentDate = (
  incidentTimestamp: firebase.firestore.Timestamp
) => {
  const timestampToDate = convertTimestampToDate(incidentTimestamp);
  return format(timestampToDate, 'MMM Do YYYY @ h:mma');
};
