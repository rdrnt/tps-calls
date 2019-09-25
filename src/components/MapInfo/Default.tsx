import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { Colors } from '../../config';
import Text from '../Text';
import Icon from '../Icon';

interface DefaultViewProps {
  onClick: () => void;
}

const Button = styled.button`
  height: 40px;
  width: 100%;
  background-color: ${darken(0.2, Colors.SECONDARY)};
  border: none;
  border-radius: 4px;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 2px 1px rgba(0, 0, 0, 0.2);

  :hover {
    background-color: ${darken(0.4, Colors.SECONDARY)};
  }
`;

const DefaultView: React.FunctionComponent<DefaultViewProps> = ({
  onClick,
}) => {
  return (
    <Button type="button" onClick={onClick}>
      <Text as="p" size={14} lineHeight={16} color="white">
        Search for stabbing, bloor st, etc...
      </Text>
      <Icon color="white" name="search" size={20} />
    </Button>
  );
};

export default DefaultView;
