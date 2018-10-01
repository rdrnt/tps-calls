import parse from 'date-fns/parse';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';

const dateHelper = {
  parse: date => parse(date),
  // Returns Feb 1, 10:12pm
  tidyFormat: date => format(date, 'MMM d - h:mma'),

  // Pass down a date to te
  isDateValid: date => isValid(date),
};

export default dateHelper;
