import { toast } from 'sonner';
import { Link } from 'lucide-react';
import { MapRef } from 'react-map-gl';
import { FunctionComponent, useEffect } from 'react';

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

import { LocalIncident } from '../../types';

interface MapIncidentInfoProps {
  incident?: LocalIncident;
  drawerOpen: boolean;
  close: () => void;
  mapRef: MapRef | null;
}

const MapIncidentInfo: FunctionComponent<MapIncidentInfoProps> = ({
  incident,
  close,
  mapRef,
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

  useEffect(() => {
    // When an incident is selected on mobile, bring it into view with offset for the drawer
    if (incident && isMobile && mapRef) {
      // Wait for the sheet animation to complete before measuring
      // The sheet has a 500ms animation duration (data-[state=open]:duration-500)
      const measureSheetHeight = () => {
        // Find the sheet content element by its data attribute
        const sheetElement = document.querySelector(
          '[data-slot="sheet-content"]'
        ) as HTMLElement;
        if (!sheetElement) return;

        // Get the actual height of the sheet content
        const sheetHeight = sheetElement.getBoundingClientRect().height;

        // Offset upward by half the drawer height so the marker appears in the visible area above the drawer
        // The offset is [x, y] in pixels, negative y moves upward
        const offsetY = -(sheetHeight / 2);

        mapRef.flyTo({
          center: [
            incident.coordinates.longitude,
            incident.coordinates.latitude,
          ],
          offset: [0, offsetY],
          speed: 1,
          zoom: 15,
        });
      };

      // Wait for the sheet to finish animating in (500ms) before measuring
      const timeoutId = setTimeout(measureSheetHeight, 600);

      return () => clearTimeout(timeoutId);
    }
  }, [incident, isMobile, mapRef]);

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
            {formatIncidentDate(new Date(incident?.date))}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator />
        </div>

        <div className="grid auto-rows-min gap-6 px-4">
          <CameraSection nearbyCameraIds={[...incident.data.nearbyCameras]} />
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
