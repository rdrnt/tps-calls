import * as React from 'react';

import { AnimatePresence } from 'motion/react';
import { Incident } from '@rdrnt/tps-calls-shared';
import { toast } from 'sonner';
import { Link, Megaphone } from 'lucide-react';

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

interface MapIncidentInfoProps {
  incident?: Incident<any>;
  drawerOpen: boolean;
  close: () => void;
}

const MapIncidentInfo: React.FunctionComponent<MapIncidentInfoProps> = ({
  incident,
  drawerOpen,
}) => {
  const onClickCopyToClipboard = () => {
    if (!incident || !navigator) return;
    navigator.clipboard.writeText(createShareUrl(incident.id));
    toast.success('Share link copied to clipboard', {
      position: 'top-center',
    });
  };

  return (
    <AnimatePresence>
      {incident && !drawerOpen && (
        <Card className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-auto sm:w-full md:w-auto min-w-[375px] p-6">
          <CardHeader className="gap-1 px-0">
            <CardTitle className="text-2xl font-bold">
              {incident.name}
            </CardTitle>
            <CardDescription className="text-base text-primary">
              {incident.location}
            </CardDescription>
            <CardDescription className="uppercase text-xs">
              {DateHelper.formatIncidentDate(incident.date)}
            </CardDescription>
          </CardHeader>

          <Separator />
          <CardFooter className="gap-2 justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={onClickCopyToClipboard}
            >
              <Link />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Megaphone />
            </Button>
          </CardFooter>
        </Card>
      )}
    </AnimatePresence>
  );
};

export default MapIncidentInfo;
