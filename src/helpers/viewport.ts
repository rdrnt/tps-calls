const SAFE_PROBE_ID = 'viewport-safe-probe';

function readEnvInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  let probe = document.getElementById(SAFE_PROBE_ID) as HTMLDivElement | null;
  if (!probe) {
    probe = document.createElement('div');
    probe.id = SAFE_PROBE_ID;
    probe.style.cssText =
      'position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
    document.documentElement.appendChild(probe);
  }

  const style = getComputedStyle(probe);
  return {
    top: parseFloat(style.paddingTop) || 0,
    right: parseFloat(style.paddingRight) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
  };
}

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/** Floors for when env(safe-area-inset-*) returns 0 (iOS 26 WebKit #301994). */
function fallbackInsets(): { top: number; bottom: number } {
  const shortSide = Math.min(screen.width, screen.height);

  // Modern iPhones with a home indicator / Dynamic Island.
  if (shortSide >= 390 && screen.height >= 812) {
    return { top: 59, bottom: 34 };
  }

  // Older notched iPhones (e.g. iPhone X class).
  if (screen.height >= 812) {
    return { top: 44, bottom: 34 };
  }

  return { top: 20, bottom: 0 };
}

/** Apply safe-area CSS vars, with fallbacks when env() is broken on iOS. */
export function updateViewportMetrics(): void {
  const root = document.documentElement;
  const insets = readEnvInsets();

  let top = insets.top;
  let right = insets.right;
  let bottom = insets.bottom;
  let left = insets.left;

  if (isIOS() && top === 0 && bottom === 0) {
    const fallback = fallbackInsets();
    top = fallback.top;
    bottom = fallback.bottom;
  }

  root.style.setProperty('--safe-top', `${top}px`);
  root.style.setProperty('--safe-right', `${right}px`);
  root.style.setProperty('--safe-bottom', `${bottom}px`);
  root.style.setProperty('--safe-left', `${left}px`);
}

export function initViewportMetrics(): void {
  updateViewportMetrics();
  window.addEventListener('resize', updateViewportMetrics);
  window.visualViewport?.addEventListener('resize', updateViewportMetrics);
}
