import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Icon from '../Icon';

import DrawerListItem from './ListItem';

import globals from '../../globals';

const StyledList = styled.ul`
  height: 100%:
  width: 100%;
  padding: 0;
  margin: 0;
`;

const StyledBackToTop = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: ${globals.colors.materialWhite};
`;

class DrawerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };

    this.scrollToTop = this.scrollToTop.bind(this);
    this.ref = null;
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

  scrollToTop() {
    this.ref.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  render() {
    const { incidents } = this.props;
    const { selectedIndex } = this.state;
    return (
      <StyledList innerRef={node => (this.ref = node)}>
        {incidents.map((incident, index) => (
          <DrawerListItem
            {...incident}
            key={incident.id}
            selected={index === selectedIndex}
          />
        ))}
        <StyledBackToTop>
          <Button
            aria-label="Back To Top"
            variant="fab"
            color="primary"
            onClick={this.scrollToTop}
          >
            <Icon name="ArrowUpward" />
          </Button>
        </StyledBackToTop>
      </StyledList>
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
