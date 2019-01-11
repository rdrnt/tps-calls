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

  getSortControlIcon = () => {
    const { sortType } = this.props;
    const currentSortItem = DrawerLocale.header.sortItems.find(
      sortItem => sortItem.type === sortType
    );
    return currentSortItem.iconName || '';
  };

  render() {
    const { setSortType, fetchIncidents, sortType } = this.props;
    return (
      <List>
        <DrawerHeaderControlsItem
          title="Refresh"
          iconName="Refresh"
          onClick={fetchIncidents}
        />
        <DrawerHeaderControlsItem
          title="Sort By"
          iconName={this.getSortControlIcon()}
          subItems={DrawerLocale.header.sortItems}
        >
          {DrawerLocale.header.sortItems.map(sortItem => (
            <DrawerHeaderControlsSubItem
              key={sortItem.name}
              onClick={() => setSortType(sortItem.type)}
              title={sortItem.name}
              iconName={sortItem.iconName}
              selected={sortType === sortItem.type}
            />
          ))}
        </DrawerHeaderControlsItem>
      </List>
    );
  }
}

export default HeaderControls;
