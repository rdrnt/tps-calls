import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawerListItem from './ListItem';

const StyledDrawerList = styled.ul`
  height: 100%:
  width: 100%;
  padding: 0;
  margin: 0;
`;

class DrawerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedIndex } = this.state;
    const { incidents, selectedIncident } = nextProps;

    const newIndex = incidents
      .map(incident => incident.id)
      .indexOf(selectedIncident.id);

    if (newIndex !== selectedIndex) {
      this.setState({
        selectedIndex: newIndex,
      });
    }
  }

  render() {
    const { incidents } = this.props;
    const { selectedIndex } = this.state;
    return (
      <StyledDrawerList>
        {incidents.map((incident, index) => (
          <DrawerListItem
            {...incident}
            key={incident.id}
            selected={index === selectedIndex}
          />
        ))}
      </StyledDrawerList>
    );
  }
}

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
  selectedIncident: {},
};

export default DrawerList;
