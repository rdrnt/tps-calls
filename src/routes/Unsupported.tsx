import { FunctionComponent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import DownloadButtons from '@/routes/Download/parts/DownloadButtons';
import { UNSUPPORTED_METADATA } from '@/config/seo';
import useAnalyticsPageView from '@/hooks/useAnalyticsPageView';
import usePageMetadata from '@/hooks/usePageMetadata';

const UnsupportedPage: FunctionComponent = () => {
  usePageMetadata(UNSUPPORTED_METADATA);
  useAnalyticsPageView({ path: '/unsupported' });

  return (
    <div className="bg-background text-foreground h-screen w-full overflow-y-auto antialiased">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-5">
        <SiteHeader />

        <main className="flex flex-1 flex-col justify-center py-20 md:py-28">
          <div className="max-w-xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-tight sm:text-6xl">
              This browser isn&apos;t supported
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed sm:text-lg">
              The live map renders with WebGL2, which this browser doesn&apos;t
              support. Updating to a current version of Chrome, Safari, Firefox
              or Edge usually fixes it. If you&apos;re already up to date,
              hardware acceleration is probably switched off in your browser
              settings.
            </p>
            {/* No web-app CTA: it links to / which redirects straight back here. */}
            <DownloadButtons className="mt-10 flex flex-wrap gap-3" withIcons />
          </div>
        </main>

        <SiteFooter
          actions={
            <Button asChild variant="outline" className="h-11 px-4">
              <Link to="/contact">Contact</Link>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default UnsupportedPage;
