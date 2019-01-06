import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '../../Icon';

class DrawerHeaderControlsItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  toggleSelectedState = () => {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }));
  };

  render() {
    const { title, iconName, onClick } = this.props;
    const { selected } = this.state;
    return (
      <ListItem button onClick={onClick || this.toggleSelectedState}>
        <ListItemText>{title}</ListItemText>
        {iconName && (
          <ListItemIcon>
            <Icon name={iconName} color={selected ? 'primary' : 'inherit'} />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
}

DrawerHeaderControlsItem.propTypes = {
  icon: PropTypes.node,
};

DrawerHeaderControlsItem.defaultProps = {
  icon: null,
};

export default DrawerHeaderControlsItem;
