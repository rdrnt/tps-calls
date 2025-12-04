import { Map } from 'lucide-react';
import { Link } from 'react-router';

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
    <div className="bg-background h-screen w-full">
      <Container className="h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-18 h-18 rounded-md shadow-md mb-10"
          />
          <Typography variant="h2" className="mb-2">
            Download the App
          </Typography>

          <Typography variant="p" className="text-center max-w-md">
            Know what’s happening near you in real time. Available on iOS and
            Android.
          </Typography>

          <div className="flex flex-col items-center justify-center mt-10">
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
              <Link to="/">
                <Map />
                <Typography variant="p">View On The Web</Typography>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DownloadPage;
