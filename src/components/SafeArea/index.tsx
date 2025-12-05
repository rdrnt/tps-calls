import React from 'react';
import clsx from 'clsx';

type SafeAreaProps = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;

  /**
   * bottomInteractiveZone:
   * true = reserve vertical breathing room for an interactive control
   * near the bottom of the viewport (search bar, FAB row, etc),
   * similar to how iOS floats its bottom URL/search bar.
   *
   * This uses pb-safe-bottom-zone instead of pb-safe-bottom.
   */
  bottomInteractiveZone?: boolean;

  className?: string;
  children?: React.ReactNode;
};

/**
 * SafeArea
 *
 * Wrap content with this. It applies padding that respects notches,
 * home-indicator area, and iOS bottom chrome.
 *
 * Examples:
 *
 * 1. Fullscreen page with header at top, content scroll in middle.
 *
 * <SafeArea top bottom className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col">
 *   <header className="h-12 flex items-center px-4 border-b border-neutral-800 text-sm font-medium">
 *     Search
 *   </header>
 *   <main className="flex-1 overflow-y-auto px-4 text-sm">
 *     ...
 *   </main>
 * </SafeArea>
 *
 *
 * 2. Page where you have an interactive thing pinned near the bottom
 *    (like a floating search bar, compose box, CTA row).
 *    You don't want that box to collide with Safari's bottom bar.
 *
 * <SafeArea
 *   top
 *   bottomInteractiveZone
 *   className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col"
 * >
 *   <main className="flex-1 overflow-y-auto px-4 text-sm">
 *     content...
 *   </main>
 *
 *   <div className="px-4 pb-4">
 *     <div className="rounded-xl bg-neutral-800 text-neutral-100 text-sm px-4 py-3 shadow-lg border border-neutral-700">
 *       <input
 *         className="bg-transparent outline-none w-full text-sm placeholder-neutral-400"
 *         placeholder="Search"
 *       />
 *     </div>
 *   </div>
 * </SafeArea>
 */
export function SafeArea({
  top,
  right,
  bottom,
  left,
  bottomInteractiveZone,
  className,
  children,
}: SafeAreaProps) {
  return (
    <div
      className={clsx(
        className,
        top && 'pt-safe-top',
        right && 'pr-safe-right',
        left && 'pl-safe-left',
        bottom && !bottomInteractiveZone && 'pb-safe-bottom',
        bottomInteractiveZone && 'pb-safe-bottom-zone'
      )}
    >
      {children}
    </div>
  );
}
