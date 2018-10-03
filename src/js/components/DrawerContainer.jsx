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
    const {
      open,
      mobile,
      toggleDrawer,
      incidents,
      selectedIncident,
    } = this.props;
    const { searchValue } = this.state;
    return (
      <Drawer
        variant={mobile ? 'temporary' : 'persistent'}
        open={open}
        PaperProps={
          mobile
            ? {
                style: {
                  width: '100%',
                  height: '60%',
                },
              }
            : {
                style: {
                  width: '350px',
                  height: '100%',
                },
              }
        }
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
                    incident.type.includes(searchValue) ||
                    incident.street.includes(searchValue)
                )
              : incidents
          }
          selectedIncident={searchValue.length > 0 ? null : selectedIncident} // If we're searching dont show selectedIncident
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
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
};

DrawerContainer.defaultProps = {
  open: false,
  mobile: false,
  toggleDrawer: () => {},
  incidents: [],
  selectedIncident: null,
};

export default DrawerContainer;
