import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

const dateHelper = {
  // Returns Feb 1, 10:12pm
  tidyFormat: date => format(date, 'MMM d, h:mma'),

  // Pass down a date to te
  isDateValid: date => isValid(date),

  // For some reason date-fns and Date() dont play well with the dates we recieve from the police API
  // Check if its a valid date
  // If not, create our own little hacky date
  convert: date => {
    const vanillaDate = new Date(date);
    // If a valid date
    if (isValid(vanillaDate)) {
      return vanillaDate;
    }

    // if it's not a valid date
    // Store the year month and date (e.x 2018.02.10)
    const dateYMD = date.split(' ')[0];
    // Store the time (e.x 9:10:31)
    const dateTime = date.split(' ')[1];

    // Parse the info from above
    const dateInfo = {
      year: dateYMD.split('.')[0],
      month: dateYMD.split('.')[1],
      day: dateYMD.split('.')[2],
      hour: dateTime.split(':')[0],
      minute: dateTime.split(':')[1],
    };

    // Return a new date from the parsed info
    return new Date(
      dateInfo.year,
      dateInfo.month,
      dateInfo.day,
      dateInfo.hour,
      dateInfo.minute
    );
  },
};

export default dateHelper;
