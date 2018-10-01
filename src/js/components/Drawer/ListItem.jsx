import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import globals from '../../globals';

const StyledDrawerListItem = styled.li`
  padding: 20px;
  list-style-type: none;
  background-color: ${props =>
    props.selected
      ? globals.colors.materialDarkGrey
      : globals.colors.materialWhite};
`;

// I would have liked this to be a statless function component
// But we need to be able to use refs so we can scoll it into view

class DrawerListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.ref = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.ref.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  render() {
    const { selected, street, type, date } = this.props;
    return (
      <StyledDrawerListItem
        selected={selected}
        innerRef={node => (this.ref = node)}
      >
        <Typography variant="title">{type}</Typography>
        <Typography variant="subheading">
          {street}-{date}
        </Typography>
      </StyledDrawerListItem>
    );
  }
}

export default DrawerListItem;
