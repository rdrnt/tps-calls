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
    // Probe env() at runtime; when iOS 26 Safari letterboxes the page it returns 0.
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

/** Sync layout viewport size and safe-area CSS vars for mobile Safari quirks. */
export function updateViewportMetrics(): void {
  const root = document.documentElement;
  const visualViewport = window.visualViewport;
  const height = visualViewport?.height ?? window.innerHeight;
  const width = visualViewport?.width ?? window.innerWidth;

  root.style.setProperty('--app-height', `${height}px`);
  root.style.setProperty('--app-width', `${width}px`);

  const insets = readEnvInsets();
  root.style.setProperty('--safe-top', `${insets.top}px`);
  root.style.setProperty('--safe-right', `${insets.right}px`);
  root.style.setProperty('--safe-bottom', `${insets.bottom}px`);
  root.style.setProperty('--safe-left', `${insets.left}px`);

  // When Safari letterboxes (WebKit #301994 on iOS 26+), browser chrome sits
  // outside innerHeight — do not also reserve the floating-toolbar zone inside
  // the layout viewport or bottom controls float too high.
  const letterboxed =
    isIOS() &&
    insets.top === 0 &&
    insets.bottom === 0 &&
    screen.height - height > 80;

  root.classList.toggle('ios-letterboxed', letterboxed);
  root.style.setProperty(
    '--safe-bottom-zone-extra',
    letterboxed ? '0px' : '3.5rem'
  );
}

export function initViewportMetrics(): void {
  updateViewportMetrics();

  window.addEventListener('resize', updateViewportMetrics);
  window.visualViewport?.addEventListener('resize', updateViewportMetrics);
  window.visualViewport?.addEventListener('scroll', updateViewportMetrics);
}
