import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

import Icon from '../Icon';

const MenuItem = ({ switchValues, text, icon }) => (
  <ListItem button>
    <Icon name={icon} />
    <ListItemText primary={text} />
    {switchValues && (
      <ListItemSecondaryAction>
        <Switch
          checked={switchValues.checked}
          onChange={switchValues.onCheck}
          value={switchValues.value}
        />
      </ListItemSecondaryAction>
    )}
  </ListItem>
);

MenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  switchValues: PropTypes.objectOf(PropTypes.shape),
};

MenuItem.defaultProps = {
  text: '',
  icon: '',
  switchValues: {
    onChange: () => {},
    value: '',
    checked: false,
  },
};

export default MenuItem;
