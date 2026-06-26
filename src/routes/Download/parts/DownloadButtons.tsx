import { FunctionComponent } from 'react';
import { Link } from 'react-router';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { APPSTORE_DOWNLOAD_LINK } from '@/config';

interface DownloadButtonsProps {
  /** Render the brand icons alongside the labels (hero only). */
  withIcons?: boolean;
  /** Include the outline "View on web" button (hero only). */
  withWebApp?: boolean;
  className?: string;
}

/**
 * The two app-store buttons share the same primary treatment (they're equal
 * download options); "View on web" is the secondary/outline action.
 */
const DownloadButtons: FunctionComponent<DownloadButtonsProps> = ({
  withIcons = false,
  withWebApp = false,
  className,
}) => (
  <div className={className ?? 'flex flex-wrap gap-3'}>
    <Button asChild className="h-11 px-4">
      <a
        href={APPSTORE_DOWNLOAD_LINK.IOS}
        target="_blank"
        rel="noopener noreferrer"
      >
        {withIcons && <FaApple />}
        App Store
      </a>
    </Button>

    <Button asChild className="h-11 px-4">
      <a
        href={APPSTORE_DOWNLOAD_LINK.ANDROID}
        target="_blank"
        rel="noopener noreferrer"
      >
        {withIcons && <FaGooglePlay />}
        Google Play
      </a>
    </Button>

    {withWebApp && (
      <Button asChild variant="outline" className="h-11 px-4">
        <Link to="/">
          {withIcons && <Globe />}
          View on web
        </Link>
      </Button>
    )}
  </div>
);

export default DownloadButtons;
