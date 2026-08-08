import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';

export type MapViewportSize = {
  width: number;
  height: number;
};

/** Apply fixed full-screen layout on the portaled map shell (inline = wins over CSS). */
function applyContainerLayout(el: HTMLDivElement, size: MapViewportSize): void {
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '0';
  el.style.margin = '0';
  el.style.padding = '0';
  el.style.overflow = 'hidden';
  el.style.zIndex = '0';
  el.style.width = `${size.width}px`;
  el.style.height = `${size.height}px`;
}

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Resolve the target map box size. On iOS Safari the layout viewport is often
 * shorter than the physical screen; use the larger of measured box vs screen.*
 */
function resolveViewportSize(el: HTMLDivElement): MapViewportSize | null {
  applyContainerLayout(el, {
    width: el.offsetWidth || window.innerWidth,
    height: el.offsetHeight || window.innerHeight,
  });

  const rect = el.getBoundingClientRect();
  let width = Math.max(
    el.offsetWidth,
    Math.round(rect.width),
    document.documentElement.clientWidth,
    window.innerWidth
  );
  let height = Math.max(
    el.offsetHeight,
    Math.round(rect.height),
    document.documentElement.clientHeight,
    window.innerHeight,
    window.visualViewport?.height ?? 0
  );

  if (isIOS()) {
    width = Math.max(width, screen.width);
    height = Math.max(height, screen.height);
  }

  width = Math.round(width);
  height = Math.round(height);

  if (width <= 0 || height <= 0) {
    return null;
  }

  applyContainerLayout(el, { width, height });
  return { width, height };
}

/**
 * Keep the Mapbox container at 100% of the visible viewport and call resize().
 * Defers map mount until the shell reports non-zero dimensions.
 */
export function useForceMapLayout(mapRef: React.RefObject<MapRef | null>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<MapViewportSize>({ width: 0, height: 0 });
  const ready = size.width > 0 && size.height > 0;

  const sync = useCallback(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const next = resolveViewportSize(el);
    if (!next) {
      return;
    }

    setSize(prev =>
      prev.width === next.width && prev.height === next.height ? prev : next
    );

    mapRef.current?.resize();
  }, [mapRef]);

  useLayoutEffect(() => {
    sync();
    requestAnimationFrame(sync);

    const interval = window.setInterval(sync, 120);
    const stopPolling = window.setTimeout(
      () => window.clearInterval(interval),
      5000
    );

    window.addEventListener('resize', sync);
    window.addEventListener('orientationchange', sync);
    window.visualViewport?.addEventListener('resize', sync);
    window.visualViewport?.addEventListener('scroll', sync);

    const el = containerRef.current;
    const observer = el ? new ResizeObserver(sync) : null;
    if (el && observer) {
      observer.observe(el);
    }

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stopPolling);
      window.removeEventListener('resize', sync);
      window.removeEventListener('orientationchange', sync);
      window.visualViewport?.removeEventListener('resize', sync);
      window.visualViewport?.removeEventListener('scroll', sync);
      observer?.disconnect();
    };
  }, [sync]);

  const onMapLoad = useCallback(() => {
    sync();
    requestAnimationFrame(sync);
    window.setTimeout(sync, 0);
    window.setTimeout(sync, 100);
    window.setTimeout(sync, 300);
  }, [sync]);

  return { containerRef, size, ready, sync, onMapLoad };
}
