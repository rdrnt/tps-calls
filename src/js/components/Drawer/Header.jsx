import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import Icon from '../Icon';

import globals from '../../globals';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
  },
  button: {
    width: 25,
    height: 25,
    padding: 0,
  },
  icon: {
    fontSize: 20,
    color: '#fffff',
  },
});

const StyledHeaderClose = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: flex-end;
`;

const DrawerHeader = ({
  mobile,
  closeDrawer,
  onSearchChange,
  searchValue,
  classes,
}) => (
  <Paper className={classes.root} elevation={0}>
    <StyledHeaderClose show={mobile}>
      <IconButton
        aria-label="close"
        onClick={closeDrawer}
        disableRipple
        style={styles.button}
        iconstyle={styles.icon}
      >
        <Icon name="Close" />
      </IconButton>
    </StyledHeaderClose>
    <TextField
      id="search-header"
      type="search"
      label="Search for Assualt, College St, etc..."
      margin="normal"
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
    />
  </Paper>
);

DrawerHeader.propTypes = {
  mobile: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

DrawerHeader.defaultProps = {
  closeDrawer: () => {},
  searchValue: '',
};

export default withStyles(styles)(DrawerHeader);
