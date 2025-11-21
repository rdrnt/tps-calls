import * as React from 'react';

import { Incident } from '@rdrnt/tps-calls-shared';
import { toast } from 'sonner';
import { Link } from 'lucide-react';

import { Separator } from '../ui/separator';

import { Button } from '../ui/button';
import { TwitterIcon } from '../Icon/custom/Twitter';

import { createShareUrl, createTwitterShareUrl } from '../../helpers/url';
import CameraSection from './parts/CameraSection';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { formatIncidentDate } from '../../helpers/date';
import useIsMobile from '../../hooks/useIsMobile';

interface MapIncidentInfoProps {
  incident?: Incident<any>;
  drawerOpen: boolean;
  close: () => void;
}

const MapIncidentInfo: React.FunctionComponent<MapIncidentInfoProps> = ({
  incident,

  close,
}) => {
  const { isMobile } = useIsMobile();

  const onClickCopyToClipboard = () => {
    if (!incident || !navigator || navigator.clipboard === undefined) return;
    navigator.clipboard.writeText(createShareUrl(incident.id));
    toast.success('Share link copied to clipboard', {
      position: 'top-center',
    });
  };

  const onClickShareOnTwitter = () => {
    if (!incident) return;
    window.open(`${createTwitterShareUrl(incident)}`, '_blank');
  };

  if (!incident) return null;

  return (
    <Sheet
      open={true}
      onOpenChange={open => {
        if (!open) {
          close();
        }
      }}
    >
      <SheetContent
        overlayClassName="bg-background/20"
        side={isMobile ? 'bottom' : 'right'}
      >
        <SheetHeader className="pb-0">
          <SheetTitle className="text-2xl font-bold">
            {incident?.name}
          </SheetTitle>
          <SheetDescription>{incident?.location}</SheetDescription>
          <SheetDescription className="text-sm text-gray-500">
            {formatIncidentDate(incident?.date)}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator />
        </div>

        <div className="grid auto-rows-min gap-6 px-4">
          <CameraSection nearbyCameras={[...incident.data.nearbyCameras]} />
        </div>

        <SheetFooter>
          <Button onClick={onClickCopyToClipboard}>
            <Link />
            Copy to Clipboard
          </Button>
          <Button onClick={onClickShareOnTwitter}>
            <TwitterIcon />
            Share on Twitter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MapIncidentInfo;
