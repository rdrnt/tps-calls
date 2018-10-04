import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import DrawerListItem from './ListItem';

const DrawerList = ({ incidents, selectedIncident }) => (
  <>
    <List
      component="nav"
      style={{
        overflow: 'scroll', // Only allow scrolling on the list
        marginBottom: selectedIncident ? '68px' : '0px', // Set 68px so the selected incident at the bottom doesn't get hidden behind the selected incident
      }}
    >
      {/* List all of the incidents */}
      {incidents.map(incident => (
        <DrawerListItem incident={incident} key={incident.id} />
      ))}
      {/* Highlight the selected incident */}
      {selectedIncident ? (
        <Paper
          style={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
          elevation={1}
        >
          <DrawerListItem incident={selectedIncident} selected />
        </Paper>
      ) : null}
    </List>
  </>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
  selectedIncident: null,
};

export default DrawerList;
