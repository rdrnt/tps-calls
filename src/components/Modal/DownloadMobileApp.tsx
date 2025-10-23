import * as React from 'react';

import { Button } from '../ui/button';

import { ModalProps } from '.';

import { Analytics } from '../../helpers';

type ProjectInfoModal = ModalProps;

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';

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
          Now, you can access real-time police response locations across Toronto
          wherever you go. Download the app today to stay informed on the move,
          wherever you are in the city.
        </DialogDescription>
        <DialogDescription>
          Available on the App Store and Google Play.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
        <Button type="button" variant="secondary" asChild>
          <a href="/download" target="_blank" rel="noopener">
            Visit Download Page
          </a>
        </Button>
      </DialogFooter>
    </>
  );
};

export default DownloadMobileAppModal;
