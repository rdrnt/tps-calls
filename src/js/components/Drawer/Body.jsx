import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import globals from '../../globals';

const StyledDrawerBody = styled.div`
  background-color: ${globals.colors.materialWhite};
  width: ${props => (props.mobile ? '100%' : '300px')};
  height: 100%;
`;

const DrawerBody = ({ children, mobile }) => (
  <StyledDrawerBody mobile={mobile}>{children}</StyledDrawerBody>
);

DrawerBody.propTypes = {
  children: PropTypes.element.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default DrawerBody;
