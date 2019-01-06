import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import DrawerHeaderControlsItem from './HeaderControls/Item';
import DrawerHeaderControlsSubItem from './HeaderControls/SubItem';

import { DrawerLocale } from '../../locale';

class HeaderControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { setSortType } = this.props;
    return (
      <List>
        <DrawerHeaderControlsItem
          title="Refresh"
          iconName="Refresh"
          onClick={() => console.log('hello')}
        />
        <DrawerHeaderControlsItem
          title="Sort By"
          iconName="Filter"
          subItems={DrawerLocale.header.sortItems}
        >
          {DrawerLocale.header.sortItems.map(sortItem => (
            <DrawerHeaderControlsSubItem
              key={sortItem.name}
              onClick={() => setSortType(sortItem.type)}
              title={sortItem.name}
            />
          ))}
        </DrawerHeaderControlsItem>
      </List>
    );
  }
}

export default HeaderControls;
