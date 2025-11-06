import * as React from 'react';

import { AnimatePresence } from 'motion/react';
import { Incident } from '@rdrnt/tps-calls-shared';
import { toast } from 'sonner';
import { Copy, Link, Megaphone } from 'lucide-react';
import { useState } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';

import { DateHelper } from '../../helpers';

import { Button } from '../ui/button';

import { createShareUrl } from '../../helpers/url';
import CameraSection from './parts/CameraSection';
import { TorontoTrafficCamera } from '../../containers/BetaFeature';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { formatIncidentDate } from '../../helpers/date';

interface MapIncidentInfoProps {
  incident?: Incident<any>;
  drawerOpen: boolean;
  close: () => void;
}

const MapIncidentInfo: React.FunctionComponent<MapIncidentInfoProps> = ({
  incident,

  close,
}) => {
  const onClickCopyToClipboard = () => {
    if (!incident || !navigator) return;
    navigator.clipboard.writeText(createShareUrl(incident.id));
    toast.success('Share link copied to clipboard', {
      position: 'top-center',
    });
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
      <SheetContent overlayClassName="bg-background/20">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            {incident?.name}
          </SheetTitle>
          <SheetDescription>{incident?.location}</SheetDescription>
          <SheetDescription className="text-sm text-gray-500">
            {formatIncidentDate(incident?.date)}
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <CameraSection nearbyCameras={[...incident.data.nearbyCameras]} />
        </div>

        <SheetFooter>
          <Button onClick={close}>
            <Link />
            Copy to Clipboard
          </Button>
          <Button onClick={close}>
            <Megaphone />
            Share on Twitter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MapIncidentInfo;
