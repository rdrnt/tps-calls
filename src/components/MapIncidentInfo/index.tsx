import { toast } from 'sonner';
import { Link, Share } from 'lucide-react';
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
import * as Analytics from '../../helpers/analytics';

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

  const canShare = isMobile && typeof navigator.share === 'function';

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied to clipboard', {
        position: 'top-center',
      });
      Analytics.event({
        category: 'UI',
        action: Analytics.UI.SHARE_INCIDENT_URL,
        label: 'copy',
      });
    } catch {
      toast.error("Couldn't copy the link", {
        description: url,
        position: 'top-center',
      });
    }
  };

  const onClickShare = async () => {
    if (!incident) return;
    const url = createShareUrl(incident.id);
    if (!canShare) {
      copyLink(url);
      return;
    }
    try {
      await navigator.share({
        title: incident.name,
        text: `${incident.name} at ${incident.location}`,
        url,
      });
      Analytics.event({
        category: 'UI',
        action: Analytics.UI.SHARE_INCIDENT_URL,
        label: 'share-sheet',
      });
    } catch (error) {
      // Dismissing the share sheet rejects with AbortError, which isn't a failure.
      if ((error as Error).name !== 'AbortError') copyLink(url);
    }
  };

  const onClickShareOnTwitter = () => {
    if (!incident) return;
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHARE_INCIDENT_TWITTER,
    });
    window.open(createTwitterShareUrl(incident), '_blank', 'noopener');
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
        {/* Keyed so switching incidents fades the new details in. */}
        <div
          key={shown.id}
          className="animate-in fade-in-25 slide-in-from-bottom-1 flex flex-col gap-4 duration-200 ease-out"
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
        </div>

        <SheetFooter>
          <Button onClick={onClickShare}>
            {canShare ? <Share /> : <Link />}
            {canShare ? 'Share' : 'Copy link'}
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
