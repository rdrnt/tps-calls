import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';

import { DrawerList, DrawerHeader } from './Drawer';

class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  render() {
    const { open, mobile, toggleDrawer, incidents } = this.props;
    const { searchValue } = this.state;
    return (
      <Drawer
        variant={mobile ? 'temporary' : 'persistent'}
        open={open}
        PaperProps={{
          style: {
            width: mobile ? '100%' : '350px',
            height: mobile ? '70%' : '100%',
          },
        }}
        ModalProps={{
          onBackdropClick: () => toggleDrawer(false),
        }}
        anchor={mobile ? 'bottom' : 'left'}
      >
        <DrawerHeader
          mobile={mobile}
          closeDrawer={() => toggleDrawer(false)}
          onSearchChange={this.onSearchChange}
          searchValue={searchValue}
        />
        {/* search through incidents if we have any */}
        <DrawerList
          incidents={
            searchValue.length > 0
              ? incidents.filter(
                  incident =>
                    incident.type
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    incident.street
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
              : incidents
          }
        />
      </Drawer>
    );
  }
}
DrawerContainer.propTypes = {
  open: PropTypes.bool,
  mobile: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerContainer.defaultProps = {
  open: false,
  mobile: false,
  toggleDrawer: () => {},
  incidents: [],
};

export default DrawerContainer;
