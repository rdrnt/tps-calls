import * as React from 'react';

import { cn } from '../../lib/utils';

interface FadeInImageProps extends React.ComponentProps<'img'> {
  /** Classes for the placeholder box (size, aspect, rounding); the image fills it. */
  className?: string;
}

/** An image that fades in over a muted placeholder once it has loaded. */
const FadeInImage: React.FunctionComponent<FadeInImageProps> = ({
  className,
  onLoad,
  ...props
}) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <span className={cn('bg-muted block overflow-hidden', className)}>
      <img
        {...props}
        // A cached image can finish loading before React attaches onLoad.
        ref={image => {
          if (image?.complete && image.naturalWidth) setLoaded(true);
        }}
        onLoad={event => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn(
          'size-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </span>
  );
};

export default FadeInImage;
