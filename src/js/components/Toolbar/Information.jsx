import React from 'react';
import styled from 'styled-components';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';

import Icon from '../Icon';

const AppToolbarInformation = ({ open, parentAnchorEl, toggleOpen }) => (
  <>
    <IconButton onClick={toggleOpen}>
      <Icon name="Info" />
    </IconButton>
    <Popover
      id="simple-popper"
      open={open}
      anchorEl={parentAnchorEl}
      onClose={toggleOpen}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      hi
    </Popover>
  </>
);

export default AppToolbarInformation;
