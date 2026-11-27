import { toast } from 'sonner';
import { Link } from 'lucide-react';
import { MapRef } from 'react-map-gl/mapbox';
import {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  RefObject,
} from 'react';

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
  mapRef: RefObject<MapRef | null>;
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

  const sheetRef = useRef<HTMLDivElement>(null);

  // Keep the last incident on screen while the sheet slides out.
  const [shown, setShown] = useState(incident);
  if (incident && incident !== shown) {
    setShown(incident);
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!incident || !map) return;

    // The sheet has mounted by the next frame, and sliding in doesn't change its size.
    const frame = requestAnimationFrame(() => {
      const sheet = sheetRef.current?.getBoundingClientRect();
      map.flyTo({
        center: [incident.coordinates.longitude, incident.coordinates.latitude],
        // Centre the incident in the part of the map the sheet leaves visible.
        offset: isMobile
          ? [0, -(sheet?.height ?? 0) / 2]
          : [-(sheet?.width ?? 0) / 2, 0],
        speed: 1.2,
        zoom: 15,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [incident, isMobile, mapRef]);

  if (!shown) return null;

  return (
    <Sheet
      open={Boolean(incident)}
      onOpenChange={open => {
        if (!open) {
          close();
        }
      }}
    >
      <SheetContent
        ref={sheetRef}
        overlayClassName="bg-transparent"
        side={isMobile ? 'bottom' : 'right'}
        // Leave room for the map on short screens like the iPhone Duo.
        className={isMobile ? 'max-h-[65dvh] overflow-y-auto' : undefined}
        // Focusing the first button on open draws a ring on "Copy link".
        onOpenAutoFocus={event => event.preventDefault()}
      >
        <SheetHeader className="pb-0">
          <SheetTitle className="text-2xl font-bold">{shown.name}</SheetTitle>
          <SheetDescription>{shown.location}</SheetDescription>
          <SheetDescription className="text-sm text-gray-500">
            {formatIncidentDate(new Date(shown.date))}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Separator />
        </div>

        <div className="grid auto-rows-min gap-6 px-4">
          <CameraSection
            nearbyCameraIds={[...(shown.data?.nearbyCameras ?? [])]}
          />
        </div>

        <SheetFooter>
          <Button onClick={onClickCopyToClipboard}>
            <Link />
            Copy link
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
