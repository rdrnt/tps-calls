import { useLayoutEffect, useState } from 'react';

/** Hidden probe matching the working diag page: fixed inset-0 on body. */
export function measureViewport(): { width: number; height: number } {
  let probe = document.getElementById('viewport-size-probe') as HTMLDivElement | null;
  if (!probe) {
    probe = document.createElement('div');
    probe.id = 'viewport-size-probe';
    probe.style.cssText =
      'position:fixed;inset:0;visibility:hidden;pointer-events:none;margin:0;padding:0;border:0';
    document.body.appendChild(probe);
  }

  const rect = probe.getBoundingClientRect();
  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

export function useViewportSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const update = () => {
      setSize(measureViewport());
    };

    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, []);

  return size;
}
