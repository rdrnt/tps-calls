import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { Sizes, Colors } from '../../config';
import Text from '../Text';

interface ButtonBorder {
  radius?: number;
  color?: string;
}

interface Button {
  border?: ButtonBorder;
  color?: string;
  onClick?: () => void;
  label?: string;
}

const Container = styled.button<{
  color: string;
  border: ButtonBorder;
  hasLabel: boolean;
}>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${Sizes.SPACING / 3}px;
  border: ${props =>
    props.border.color ? `1px solid ${props.border.color}` : 'none'};
  border-radius: ${props => props.border.radius || 0}px;
  background-color: ${props => props.color};

  min-width: ${props => (props.hasLabel ? 60 : 20)}px;

  &:hover {
    background-color: ${props => darken(0.2, props.color)};
  }
`;

const Button: React.FunctionComponent<Button> = ({
  border = {
    radius: 4,
  },
  color = Colors.PRIMARY,
  label,
  onClick,
  children,
}) => (
  <Container
    type="button"
    color={color}
    border={border}
    onClick={onClick}
    hasLabel={Boolean(label)}
  >
    {label ? (
      <Text as="span" color="white" size={12} lineHeight={12}>
        {label}
      </Text>
    ) : (
      children
    )}
  </Container>
);

export default Button;
