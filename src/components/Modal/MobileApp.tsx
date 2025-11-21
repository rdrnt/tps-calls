import * as React from 'react';

import { Button } from '../ui/button';

import { ModalProps } from '.';

import { Analytics } from '../../helpers';

import AppStoreIcon from '../../assets/images/appStoreDownload.png';
import PlayStoreIcon from '../../assets/images/googlePlayDownload.png';

type ProjectInfoModal = ModalProps;

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { APPSTORE_DOWNLOAD_LINK } from '../../config';

const DownloadMobileAppModal: React.FunctionComponent<
  ProjectInfoModal
> = () => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_DOWNLOAD_APP_MODAL,
    });
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Download the mobile app</DialogTitle>
        <DialogDescription>
          Now, you can access real-time police incidents across Toronto wherever
          you go. Download the app today to stay informed on the move, wherever
          you are in the city.
        </DialogDescription>
        <DialogDescription>
          Available on the App Store and Google Play.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
        <a
          href={APPSTORE_DOWNLOAD_LINK.IOS}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={AppStoreIcon} />
        </a>

        <a
          href={APPSTORE_DOWNLOAD_LINK.ANDROID}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={PlayStoreIcon} />
        </a>
      </DialogFooter>
    </>
  );
};

export default DownloadMobileAppModal;
