import { FunctionComponent, useState } from 'react';
import { Cctv } from 'lucide-react';

import { Typography } from '../../Typography';

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '../../ui/item';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '../../ui/empty';
import { cn } from '../../../lib/utils';
import { Alert, AlertTitle } from '../../ui/alert';
import useNearbyCameras from '../../../hooks/useNearbyCameras';
import CameraViewer, { liveImageUrl } from './CameraViewer';

interface CameraSectionProps {
  nearbyCameraIds: string[];
}

const CameraSection: FunctionComponent<CameraSectionProps> = ({
  nearbyCameraIds,
}) => {
  const { cameras: loaded, loading } = useNearbyCameras(nearbyCameraIds);
  const cameras = loaded.filter(camera => liveImageUrl(camera));

  // Kept separately from `open` so the viewer's content stays while it fades out.
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewingId, setViewingId] = useState<string>();

  if (!loading && cameras.length === 0) {
    return (
      <>
        {/* Mobile only */}
        <div className="block md:hidden">
          <Alert>
            <Cctv />
            <AlertTitle>No nearby cameras</AlertTitle>
          </Alert>
        </div>
        {/* Tablet / desktop only */}
        <div className="hidden md:block">
          <Empty className="bg-secondary">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Cctv />
              </EmptyMedia>
              <EmptyTitle>No nearby cameras</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </div>
      </>
    );
  }

  const count = loading ? nearbyCameraIds.length : cameras.length;

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h5">Nearby Cameras</Typography>
      <ItemGroup
        className={cn(
          `grid gap-2 max-w-full`,
          // Mobile: if 3+ items → 3 cols, else → 2 cols
          count >= 3 ? 'grid-cols-3' : 'grid-cols-2',
          // Desktop (md+): if 1 item → 1 col, else → 2 cols
          count === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'
        )}
      >
        {loading
          ? nearbyCameraIds.map(id => (
              // Shaped like a loaded tile, so the sheet doesn't grow when cameras arrive.
              <div
                key={id}
                className="flex flex-col gap-2 rounded-md border p-2"
              >
                <div className="bg-muted aspect-[4/3] w-full animate-pulse rounded-sm" />
                <div className="bg-muted h-5 w-3/4 animate-pulse rounded-sm" />
              </div>
            ))
          : cameras.map(camera => (
              <Item
                key={camera.id}
                variant="outline"
                className="hover:bg-accent/50 content-start gap-2 p-2"
                asChild
              >
                <button
                  type="button"
                  aria-label={`View the ${camera.name} camera`}
                  onClick={() => {
                    setViewingId(camera.id);
                    setViewerOpen(true);
                  }}
                >
                  <ItemHeader>
                    <img
                      src={liveImageUrl(camera)}
                      alt=""
                      // City camera images are 320x240; reserving the space keeps the sheet's height fixed.
                      width={320}
                      height={240}
                      className="bg-muted aspect-[4/3] w-full rounded-sm object-cover"
                    />
                  </ItemHeader>
                  <ItemContent>
                    <ItemTitle className="text-left">{camera.name}</ItemTitle>
                  </ItemContent>
                </button>
              </Item>
            ))}
      </ItemGroup>

      <CameraViewer
        open={viewerOpen}
        cameras={cameras}
        cameraId={viewingId}
        onSelect={setViewingId}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
};

export default CameraSection;
