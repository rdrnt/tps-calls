import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';

import { DrawerList, DrawerBody, DrawerHeader } from './Drawer';

const DrawerContainer = ({ open, mobile, closeMobileDrawer, incidents }) => (
  <Drawer
    variant={mobile ? 'temporary' : 'permanent'}
    open={mobile ? open : true}
  >
    <DrawerHeader mobile={mobile} closeMobileDrawer={closeMobileDrawer} />
    <DrawerBody mobile={mobile}>
      <DrawerList incidents={incidents} />
    </DrawerBody>
  </Drawer>
);

DrawerContainer.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  closeMobileDrawer: PropTypes.func,
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerContainer.defaultProps = {
  open: false,
  mobile: false,
  closeMobileDrawer: () => {},
  incidents: [],
};

export default DrawerContainer;
