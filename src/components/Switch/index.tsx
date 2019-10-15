import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../config';
import posed from 'react-pose';

export interface Switch {
  value: boolean;
  onChange: (value: boolean) => void;
}

const WIDTH = 50;
const TOGGLEBALL_SIZE = 15;

const Container = styled.button<{ toggledOn: boolean }>`
  width: ${WIDTH}px;
  border-radius: 20px;
  background-color: ${props =>
    props.toggledOn ? Colors.PRIMARY : Colors.BACKGROUND};
  position: relative;
  display: inline-block;
  border: 1px solid ${Colors.BORDER};
  padding: 2px;
  box-shadow: none;
`;

const ToggleBall = styled.div<{ toggledOn: boolean }>`
  height: ${TOGGLEBALL_SIZE}px;
  width: ${TOGGLEBALL_SIZE}px;
  border-radius: ${TOGGLEBALL_SIZE / 2}px;
  background-color: ${props =>
    props.toggledOn ? Colors.BACKGROUND : Colors.PRIMARY};
`;

const AnimatedToggleBall = posed(ToggleBall)({
  open: {
    x: WIDTH - TOGGLEBALL_SIZE - 5, //For some reason the 5 actually helps?
  },
  close: {
    x: 0,
  },
});

const Switch: React.FunctionComponent<Switch> = ({ onChange, value }) => {
  return (
    <Container toggledOn={value} type="button" onClick={() => onChange(!value)}>
      <AnimatedToggleBall pose={value ? 'open' : 'close'} toggledOn={value} />
    </Container>
  );
};

export default Switch;
