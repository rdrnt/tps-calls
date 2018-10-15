import compareAsc from 'date-fns/compareAsc';
import compareDesc from 'date-fns/compareDesc';

const sorter = {
  // Types of sorting
  // We created a types object for easier type management
  types: {
    DATE_ASC: 'DATE_ASC',
    DATE_DESC: 'DATE_DESC',
    ALPHABET_ASC: 'ALPHABET_ASC',
    ALPHABET_DESC: 'ALPHABET_DESC',
  },

  // pass isAsc as true if you want to sort by ascending, false for desc
  sortIncidentsByDate: (dates, isAsc = false) =>
    dates.sort(
      (firstDate, secondDate) =>
        isAsc
          ? compareAsc(firstDate.date, secondDate.date)
          : compareDesc(firstDate.date, secondDate.date)
    ),

  sortAlphabetic: (incidents, isAsc = false) =>
    incidents.sort((firstIncident, secondIncident) => {
      const firstIncidentLetter = firstIncident.type.charAt(0);
      const secondIncidentLetter = secondIncident.type.charAt(0);

      return isAsc
        ? secondIncidentLetter.localeCompare(firstIncidentLetter)
        : firstIncidentLetter.localeCompare(secondIncidentLetter);
    }),

  sortForType: (incidents, type) => {
    switch (type) {
      case sorter.types.DATE_ASC:
        return sorter.sortIncidentsByDate(incidents, false);
      case sorter.types.DATE_DESC:
        return sorter.sortIncidentsByDate(incidents, true);
      case sorter.types.ALPHABET_ASC:
        return sorter.sortAlphabetic(incidents, false);
      case sorter.types.ALPHABET_DESC:
        return sorter.sortAlphabetic(incidents, true);
      default:
        break;
    }
  },
};

export default sorter;
