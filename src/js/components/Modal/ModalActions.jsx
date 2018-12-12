import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.alignment};
  align-items: center;
  min-height: 50px;
`;

export const AlignmentType = {
  center: 'center',
  right: 'flex-end',
  left: 'flex-start',
  apart: 'space-between',
};

const ModalActions = ({ children, alignment }) => (
  <StyledActionsContainer alignment={alignment}>
    {children}
  </StyledActionsContainer>
);

ModalActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  alignment: PropTypes.string.isRequired,
};

export default ModalActions;
