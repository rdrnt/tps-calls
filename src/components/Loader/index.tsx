import { FunctionComponent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useAppSelector } from '../../store';

import { Typography } from '../Typography';
import { cn } from '../../lib/utils';

const LoaderSpinner = ({ animate = true }: { animate?: boolean }) => {
  return (
    <div className={cn('relative rounded-full h-12 w-12 bg-tpscalls-primary')}>
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-tpscalls-primary',
          animate && 'animate-ping'
        )}
      />
    </div>
  );
};

export const StaticLoader: FunctionComponent<{
  message?: string;
  className?: string;
}> = ({ message = 'Loading map...', className }) => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 h-screen w-full z-999 bg-background flex flex-col justify-center items-center',
        className
      )}
    >
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

  return (
    <AnimatePresence>
      {open && (
        // Only the map opens this loader, so it uses the map's colour.
        <motion.div
          key="loader"
          className="absolute top-0 left-0 h-(--map-height) w-full z-999 bg-(--map-background) flex flex-col justify-center items-center"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
