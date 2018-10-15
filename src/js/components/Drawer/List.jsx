import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Typography from '@material-ui/core/Typography';

import DrawerListItem from './ListItem';

const DrawerList = ({ incidents }) => (
  <List
    component="nav"
    style={{
      overflow: 'scroll', // Only allow scrolling on the list
    }}
    disablePadding
  >
    {/* If we have no incidents show 'No results' */}
    {incidents.length === 0 ? (
      <Typography
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 12,
          paddingTop: 12,
        }}
        variant="subheading"
      >
        No results
      </Typography>
    ) : (
      incidents.map(incident => (
        <DrawerListItem incident={incident} key={incident.id} />
      ))
    )}
  </List>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
};

export default DrawerList;
