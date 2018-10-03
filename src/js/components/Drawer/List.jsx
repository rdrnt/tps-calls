import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import DrawerListItem from './ListItem';

const DrawerList = ({ incidents, selectedIncident }) => (
  <>
    <List component="nav">
      {/* Highlight the selected incident */}
      {selectedIncident ? (
        <DrawerListItem incident={selectedIncident} selected />
      ) : null}
      {/* List all of the incidents */}
      {incidents.map(
        incident =>
          incident === selectedIncident ? null : (
            <DrawerListItem incident={incident} key={incident.id} />
          )
      )}
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
