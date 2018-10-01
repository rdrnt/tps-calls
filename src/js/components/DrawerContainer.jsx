import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';

import { DrawerList, DrawerBody, DrawerHeader } from './Drawer';

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
      closeMobileDrawer,
      incidents,
      selectedIncident,
    } = this.props;
    const { searchValue } = this.state;
    return (
      <Drawer
        variant={mobile ? 'temporary' : 'permanent'}
        open={mobile ? open : true}
      >
        <DrawerHeader
          mobile={mobile}
          closeMobileDrawer={closeMobileDrawer}
          onSearchChange={this.onSearchChange}
          searchValue={searchValue}
        />
        <DrawerBody mobile={mobile}>
          {/* search through incidents if we have any */}
          <DrawerList
            incidents={
              searchValue.length > 0
                ? incidents.filter(incident =>
                    incident.type.includes(searchValue)
                  )
                : incidents
            }
            selectedIncident={selectedIncident}
          />
        </DrawerBody>
      </Drawer>
    );
  }
}
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
