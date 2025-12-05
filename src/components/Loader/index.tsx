import { FunctionComponent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useAppDispatch, useAppSelector } from '../../store';

import { closeLoader } from '../../store/slices/ui';
import { Typography } from '../Typography';
import { cn } from '../../lib/utils';

const LoaderSpinner = ({ animate = true }: { animate?: boolean }) => {
  return (
    <div className={cn('rounded-full h-12 w-12 bg-tpscalls-primary')}>
      <div
        className={cn(
          'fixed rounded-full bg-tpscalls-primary h-12 w-12',
          animate && 'animate-ping'
        )}
      />
    </div>
  );
};

export const StaticLoader: FunctionComponent<{ message?: string }> = ({
  message = 'Loading map...',
}) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full z-999 bg-background flex flex-col justify-center items-center">
      <LoaderSpinner animate={false} />
      <Typography
        variant="h2"
        align="center"
        className="max-sm:text-[43px] mt-4 text-primary"
      >
        {message}
      </Typography>
    </div>
  );
};

const Loader: FunctionComponent = () => {
  const { open, message } = useAppSelector(state => state.ui.loader);
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="loader"
          className="absolute top-0 left-0 h-full w-full z-999 bg-background flex flex-col justify-center items-center"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationEnd={() => {
            dispatch(closeLoader());
          }}
        >
          <LoaderSpinner animate={true} />
          {message && (
            <Typography
              variant="h2"
              align="center"
              className="max-sm:text-[43px] mt-4 text-primary"
            >
              {message}
            </Typography>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
