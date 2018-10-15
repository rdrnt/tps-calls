import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

import { sorter } from '../../helpers';
import { SorterLocale } from '../../locale';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    minWidth: 120,
  },
});

const DrawerSortView = ({ classes, value, onChange }) => (
  <div>
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="sortType-native">Sort by</InputLabel>
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
