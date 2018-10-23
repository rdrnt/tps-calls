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
    {/* List of incidents */}
    {incidents.map(incident => (
      <DrawerListItem incident={incident} key={incident.id} />
    ))}
    {/* 
      Show how many incidents there are in total
      Also shows how many search results
    */}
    <Typography
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 12,
        paddingTop: 12,
      }}
      variant="h6"
    >
      {`${incidents.length} incidents`}
    </Typography>
  </List>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
};

export default DrawerList;
