import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface ScreenDimensions {
  height: number;
  width: number;
}

export const useScreenSize = () => {
  if (!window) {
    throw new Error('Window is unavailable');
  }

  const [dimensions, setDimensions] = React.useState<ScreenDimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [resizeListener] = useDebouncedCallback(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 200);

  React.useEffect(() => {
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return dimensions;
};
