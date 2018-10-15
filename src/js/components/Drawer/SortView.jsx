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
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
});

const DrawerSortView = ({ classes, value, onChange }) => (
  <FormControl className={classes.root}>
    <InputLabel htmlFor="sortType-native">Sort by</InputLabel>
    <Select
      native
      value={value}
      onChange={changeValue => onChange(changeValue)}
    >
      {Object.keys(sorter.types).map(sortType => (
        <option value={sorter.types[sortType]} key={sortType}>
          {SorterLocale.types[sortType]}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(styles)(DrawerSortView);
