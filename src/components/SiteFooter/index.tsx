import { FunctionComponent, ReactNode } from 'react';

interface SiteFooterProps {
  /** Right-aligned action buttons (download CTAs, back-to-map, etc.). */
  actions?: ReactNode;
  /** Extra content rendered in the left column beneath the disclaimer. */
  children?: ReactNode;
}

/**
 * The shared footer for the public marketing pages: wordmark + data-source
 * disclaimer on the left, with a flexible actions slot on the right. The left
 * column copy is identical across pages; only the actions differ.
 */
const SiteFooter: FunctionComponent<SiteFooterProps> = ({
  actions,
  children,
}) => (
  // The extra bottom padding clears iOS Safari's toolbar, which covers the end of these 100vh pages.
  <footer className="flex flex-col gap-4 border-t pt-8 pb-[calc(2rem_+_100vh_-_100dvh)] sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div className="text-[15px] font-semibold">
        tpscalls
        <span className="text-tpscalls-primary font-medium">.live</span>
      </div>
      <p className="text-muted-foreground mt-2 max-w-md font-mono text-[11px] leading-relaxed">
        Built from public Toronto Police Service dispatch data. Details are
        preliminary. Not affiliated with the Toronto Police Service or the City
        of Toronto.
      </p>
      {children}
    </div>
    {actions}
  </footer>
);

export default SiteFooter;
