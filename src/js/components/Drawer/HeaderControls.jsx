import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Icon from '../Icon';

import DrawerHeaderControlsItem from './HeaderControls/Item';

class HeaderControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <List>
        <DrawerHeaderControlsItem
          title="Refresh"
          iconName="Refresh"
          onClick={() => console.log('hello')}
        />
        <Divider />
        <DrawerHeaderControlsItem title="Sort By" iconName="Filter" />
      </List>
    );
  }
}

export default HeaderControls;
