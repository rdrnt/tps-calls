import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import DrawerListItem from './ListItem';

const DrawerList = ({ incidents }) => (
  <List
    component="nav"
    style={{
      overflow: 'scroll', // Only allow scrolling on the list
    }}
  >
    {/* List all of the incidents */}
    {incidents.map(incident => (
      <DrawerListItem incident={incident} key={incident.id} />
    ))}
  </List>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
};

export default DrawerList;
