import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../store';
import { closeToast } from '../../store/ui/actions';
import { Sizes, ZIndex, Colors } from '../../config';
import Text from '../Text';
import Icon from '../Icon';

interface Toast {}

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
    y: Sizes.SPACING + Sizes.SPACING / 2,
  },
  exit: {
    opacity: 0,
    y: 0,
  },
});

const Container = styled(AnimatedContainer)`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: ${props => `calc(50% - ${props.width / 2}px)`};
  z-index: ${ZIndex.TOAST};
  border-radius: 20px;
  text-align: center;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 3}px;

  > svg {
    margin-right: 5px;
  }
`;

const Toast: React.FunctionComponent<Toast> = ({}) => {
  const dispatch = useDispatch();
  const { open, message } = useSelector(
    (appState: AppState) => appState.ui.toast
  );
  const [width, setWidth] = React.useState<number>(0);
  const measureRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(closeToast());
      }, 5000);

      if (measureRef.current) {
        setWidth(measureRef.current.clientWidth);
      }
    }
  }, [open]);

  return (
    <PoseGroup>
      {open && (
        <Container key="toast" ref={measureRef} width={width}>
          <Icon name="alert" size={20} color={Colors.PRIMARY} />
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
