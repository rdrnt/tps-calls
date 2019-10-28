import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../store';
import { closeToast } from '../../store/ui/actions';
import { Sizes, ZIndex, Colors } from '../../config';
import Text from '../Text';

interface Toast {}

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
    y: Sizes.SPACING,
  },
  exit: {
    opacity: 0,
    y: 0,
  },
});

const Container = styled(AnimatedContainer)`
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 3}px;
  min-width: 100px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: ${ZIndex.TOAST};
  border-radius: 8px;
  text-align: center;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
`;

const Toast: React.FunctionComponent<Toast> = ({}) => {
  const dispatch = useDispatch();
  const { open, message } = useSelector(
    (appState: AppState) => appState.ui.toast
  );

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(closeToast());
      }, 5000);
    }
  }, [open]);

  return (
    <PoseGroup>
      {open && (
        <Container key="toast">
          <Text
            as="span"
            color={Colors.PRIMARY}
            size={13}
            secondaryFont={false}
          >
            {message}
          </Text>
        </Container>
      )}
    </PoseGroup>
  );
};

export default Toast;
