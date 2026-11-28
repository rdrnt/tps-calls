import { FunctionComponent } from 'react';
import { m, AnimatePresence } from 'motion/react';

import { useAppSelector } from '../../store';

import { cn } from '../../lib/utils';

/** A small dot with a slow, soft pulse; the static version matches it so hand-offs don't jump. */
const LoaderContent = ({
  message,
  pulse,
}: {
  message?: string;
  pulse: boolean;
}) => (
  <div role="status" className="flex flex-col items-center gap-5">
    <span className="relative flex size-4">
      {pulse && (
        <span className="bg-tpscalls-primary/50 absolute inset-0 animate-ping rounded-full [animation-duration:1.6s]" />
      )}
      <span className="bg-tpscalls-primary relative size-4 rounded-full" />
    </span>
    {message && (
      <p className="text-muted-foreground text-sm font-medium">{message}</p>
    )}
  </div>
);

export const StaticLoader: FunctionComponent<{
  message?: string;
  className?: string;
}> = ({ message = 'Loading map...', className }) => (
  <div
    className={cn(
      'absolute top-0 left-0 h-screen w-full z-999 bg-background flex flex-col justify-center items-center',
      className
    )}
  >
    <LoaderContent message={message} pulse={false} />
  </div>
);

const Loader: FunctionComponent = () => {
  const { open, message } = useAppSelector(state => state.ui.loader);

  return (
    <AnimatePresence>
      {open && (
        // Only the map opens this loader, so it uses the map's colour.
        <m.div
          key="loader"
          className="absolute top-0 left-0 h-(--map-height) w-full z-999 bg-(--map-background) flex flex-col justify-center items-center"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoaderContent message={message} pulse />
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
