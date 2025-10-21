import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../store';
import { closeToast } from '../../store/ui/actions';
import { Sizes, ZIndex, Colors } from '../../config';
import Text from '../Text';
import Icon, { IconNames } from '../Icon';

interface Toast {}

export interface ToastOptions {
  icon?: IconNames;
  color?: string;
  intent?: 'none' | 'success' | 'error';
  hideIcon?: boolean;
}

type FinalToastOptions = Required<ToastOptions>;

const Container = styled(motion.div)<{ $width: number }>`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${(props) => `calc(50% - ${props.$width / 2}px)`};
  z-index: ${ZIndex.TOAST};
  border-radius: 20px;
  text-align: center;
  box-shadow: 2px 4px 9px 1px rgba(0, 0, 0, 0.4);

  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 3}px ${Sizes.SPACING / 2}px;
`;

const IconContainer = styled.div<{ backgroundColor: string }>`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const determineColor = ({
  color,
  intent,
}: Pick<ToastOptions, 'color' | 'intent'>): string => {
  const DEFAULT_COLOR = Colors.PRIMARY;

  if (intent && intent !== 'none') {
    switch (intent) {
      case 'error':
        return Colors.ERROR;
      case 'success':
        return Colors.SUCCESS;
      default:
        return DEFAULT_COLOR;
    }
  }

  if (color && !intent) {
    return color;
  }

  return Colors.PRIMARY;
};

const Toast: React.FunctionComponent<Toast> = ({}) => {
  const dispatch = useDispatch();
  const { open, message, options } = useSelector(
    (appState: AppState) => appState.ui.toast
  );
  const [width, setWidth] = React.useState<number>(0);
  const measureRef = React.useRef<HTMLDivElement | null>(null);

  const defaultOptions: FinalToastOptions = {
    icon: options && options.icon ? options.icon : 'alert',
    intent: options && options.intent ? options.intent : 'none',
    color: determineColor({ ...options }),
    hideIcon: Boolean(options && options.hideIcon),
  };

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
    <AnimatePresence>
      {open && (
        <Container
          key="toast"
          ref={measureRef}
          $width={width}
          animate={{ opacity: 1, top: Sizes.SPACING + Sizes.SPACING / 2 }}
          exit={{ opacity: 0, top: 0 }}
        >
          {!defaultOptions.hideIcon && (
            <IconContainer backgroundColor={defaultOptions.color}>
              <Icon name={defaultOptions.icon} size={14} color="white" />
            </IconContainer>
          )}
          <Text as="span" color="black" size={13}>
            {message}
          </Text>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Toast;
