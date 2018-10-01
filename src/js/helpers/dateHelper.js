import parse from 'date-fns/parse';
import format from 'date-fns/format';

const dateHelper = {
  parse: date => parse(date),

  // Returns Feb 1, 10:12pm
  tidyFormat: date => format(date, 'MMMd - h:mma'),
};

export default dateHelper;
