import { Map } from 'lucide-react';

import { Typography } from '../components/Typography';
import { Button } from '../components/ui/button';
import { Container } from '../components/ui/container';
import { Separator } from '../components/ui/separator';

import AppStoreDownloadImage from '../assets/images/appStoreDownload.svg';
import PlayStoreDownloadImage from '../assets/images/googlePlayDownload.svg';
import AppLogo from '../assets/images/appStoreIcon.jpg';
import useAnalyticsPageView from '../hooks/useAnalyticsPageView';

const APPSTORE_DOWNLOAD_LINK =
  'https://apps.apple.com/us/app/tpscalls/id6502376708';

const PLAYSTORE_DOWNLOAD_LINK =
  'https://play.google.com/store/apps/details?id=com.drnt.tpscalls';

const DownloadPage = () => {
  useAnalyticsPageView({ path: '/download' });

  return (
    <div className="bg-zinc-100 h-full w-full">
      <Container>
        <div className="flex flex-col items-start justify-center h-full min-h-svh">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-18 h-18 rounded-md shadow-md mb-4"
          />
          <Typography variant="h2" className="mb-2">
            Mobile App
          </Typography>

          <Typography variant="p">
            tpscalls is now available on mobile devices, bringing you a
            real-time map of Toronto Police response locations. Track incidents
            like arrests, gun calls, and collisions right from your phone. Stay
            informed with instant updates, wherever you are.
          </Typography>

          <div className="flex flex-col items-start justify-center mt-6 ">
            <div className="flex flex-row items-center justify-center gap-4">
              <a
                href={APPSTORE_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={AppStoreDownloadImage} />
              </a>
              <a
                href={PLAYSTORE_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={PlayStoreDownloadImage} />
              </a>
            </div>
            <Separator className="my-4 w-full" />

            <Button asChild>
              <a href="/">
                <Map />
                <Typography variant="p">View On The Web</Typography>
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DownloadPage;
