import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const DrawerHeaderControlsSubItem = ({ onClick, title }) => (
  <>
    <ListItem button onClick={onClick}>
      <ListItemText inset primary={title} />
    </ListItem>
    <Divider />
  </>
);

export default DrawerHeaderControlsSubItem;
