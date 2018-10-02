import compareAsc from 'date-fns/compareAsc';
import compareDesc from 'date-fns/compareDesc';

const sorter = {
  // pass isAsc as true if you want to sort by ascending, false for desc
  sortIncidentsByDate: (dates, isAsc = false) =>
    dates.sort(
      (firstDate, secondDate) =>
        isAsc
          ? compareAsc(firstDate.date, secondDate.date)
          : compareDesc(firstDate.date, secondDate.date)
    ),
};

export default sorter;
