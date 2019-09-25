import * as React from 'react';
import styled from 'styled-components';

import { Colors } from '../../config';
import Text from '../Text';
import Icon from '../Icon';

interface DefaultViewProps {
  onClick: () => void;
}

const Button = styled.button`
  height: 40px;
  width: 100%;
  background-color: ${Colors.PRIMARY};
  border: none;
  border-radius: 4px;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DefaultView: React.FunctionComponent<DefaultViewProps> = ({
  onClick,
}) => {
  return (
    <Button type="button" onClick={onClick}>
      <Text as="p" size={14} lineHeight={16} color="white">
        Search for assualt, bloor st, etc.
      </Text>
      <Icon color="white" name="search" size={20} />
    </Button>
  );
};

export default DefaultView;
