import { FunctionComponent } from 'react';
import { Link } from 'react-router';

/**
 * The shared tpscalls.live wordmark row used across the public marketing pages
 * (download, contact). Intentionally minimal: no nav menu, no live dot.
 */
const SiteHeader: FunctionComponent = () => (
  <div className="flex items-center py-6 text-[15px] font-semibold">
    <Link
      to="/"
      className="flex items-center transition-opacity hover:opacity-80"
    >
      tpscalls
      <span className="text-tpscalls-primary font-medium">.live</span>
    </Link>
  </div>
);

export default SiteHeader;
