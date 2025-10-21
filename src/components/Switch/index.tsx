import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../config';
import { motion } from 'motion/react';

export interface Switch {
  value: boolean;
  onChange: (value: boolean) => void;
}

const WIDTH = 50;
const TOGGLEBALL_SIZE = 15;

const Container = styled.button<{ toggledOn: boolean }>`
  width: ${WIDTH}px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.toggledOn ? Colors.PRIMARY : Colors.BACKGROUND};
  position: relative;
  display: inline-block;
  border: 1px solid ${Colors.BORDER};
  padding: 2px;
  box-shadow: none;
`;

const ToggleBall = styled(motion.div)<{ toggledOn: boolean }>`
  height: ${TOGGLEBALL_SIZE}px;
  width: ${TOGGLEBALL_SIZE}px;
  border-radius: ${TOGGLEBALL_SIZE / 2}px;
  background-color: ${(props) =>
    props.toggledOn ? Colors.BACKGROUND : Colors.PRIMARY};
`;

const Switch: React.FunctionComponent<Switch> = ({ onChange, value }) => {
  return (
    <Container toggledOn={value} type="button" onClick={() => onChange(!value)}>
      <ToggleBall
        animate={{ x: WIDTH - TOGGLEBALL_SIZE - 5 }}
        exit={{ x: 0 }}
        toggledOn={value}
      />
    </Container>
  );
};

export default Switch;
