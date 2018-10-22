import dateHelper from './dateHelper';

export default function isValidIncident(incident) {
  // We don't want any titles that are empty or only have one character (e.x ' ', '-', etc.)
  if (incident.type.length <= 1) {
    return false;
  }

  // Check if the date is valid
  if (!dateHelper.isDateValid(incident.date)) {
    return false;
  }

  // We don't want any streets that are empty or only have one character (e.x ' ', '-', etc.)
  if (incident.street.length <= 1) {
    return false;
  }

  return true;
}
