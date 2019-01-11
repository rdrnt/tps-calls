import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import Icon from '../../Icon';

const DrawerHeaderControlsSubItem = ({
  onClick,
  title,
  iconName,
  selected,
}) => (
  <>
    <ListItem button onClick={onClick}>
      <ListItemText inset primary={title} />
      <ListItemIcon>
        <Icon name={iconName} color={selected ? 'primary' : 'inherit'} />
      </ListItemIcon>
    </ListItem>
    <Divider />
  </>
);

export default DrawerHeaderControlsSubItem;
