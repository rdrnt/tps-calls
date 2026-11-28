import { FunctionComponent, useState } from 'react';

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
  <div role="status" className="flex flex-col items-center gap-6">
    <span className="relative flex size-6">
      {pulse && (
        <span className="bg-tpscalls-primary/50 absolute inset-0 animate-ping rounded-full [animation-duration:1.6s]" />
      )}
      <span className="bg-tpscalls-primary relative size-6 rounded-full" />
    </span>
    {message && (
      <p className="text-muted-foreground text-lg font-medium">{message}</p>
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
  // Stays mounted while it fades out; a CSS transition, so it doesn't wait on motion's lazy features.
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);
  if (!mounted) return null;

  return (
    // Only the map opens this loader, so it uses the map's colour.
    <div
      className={cn(
        'absolute top-0 left-0 h-(--map-height) w-full z-999 bg-(--map-background) flex flex-col justify-center items-center transition-opacity duration-300',
        !open && 'pointer-events-none opacity-0'
      )}
      onTransitionEnd={event => {
        if (event.target === event.currentTarget && !open) setMounted(false);
      }}
    >
      <LoaderContent message={message} pulse />
    </div>
  );
};

export default Loader;
