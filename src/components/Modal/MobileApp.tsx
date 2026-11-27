import * as React from 'react';

import { ModalProps } from './types';

import * as Analytics from '../../helpers/analytics';
import DownloadButtons from '@/routes/Download/parts/DownloadButtons';

import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

const DownloadMobileAppModal: React.FunctionComponent<ModalProps> = () => {
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
        <DialogDescription className="leading-relaxed">
          Follow Toronto Police calls wherever you are in the city, with alerts
          for incidents near you. Available on the App Store and Google Play.
        </DialogDescription>
      </DialogHeader>
      <DownloadButtons className="grid grid-cols-2 gap-2" withIcons />
    </>
  );
};

export default DownloadMobileAppModal;
