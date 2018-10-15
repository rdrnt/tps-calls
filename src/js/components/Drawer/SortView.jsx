import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { sorter } from '../../helpers';
import { SorterLocale } from '../../locale';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    paddingTop: 12,
    minWidth: 120,
  },
});

const DrawerSortView = ({ classes, value, onChange }) => (
  <div>
    <FormControl className={classes.formControl}>
      <Select native value={value} onChange={onChange}>
        {Object.keys(sorter.types).map(sortType => (
          <option value={sorter.types[sortType]} key={sortType}>
            {SorterLocale.types[sortType]}
          </option>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default withStyles(styles)(DrawerSortView);
