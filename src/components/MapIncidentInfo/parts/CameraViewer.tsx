import { FunctionComponent } from 'react';

import { cn } from '../../../lib/utils';
import FadeInImage from '../../FadeInImage';
import { LocalTorontoTrafficCamera } from '../../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

export const liveImageUrl = (camera: LocalTorontoTrafficCamera) =>
  camera.cameras.find(view => view.direction === 'Default')?.imageUrl;

interface CameraViewerProps {
  open: boolean;
  cameras: LocalTorontoTrafficCamera[];
  cameraId?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

/** One camera large, with the incident's other nearby cameras below to switch between. */
const CameraViewer: FunctionComponent<CameraViewerProps> = ({
  open,
  cameras,
  cameraId,
  onSelect,
  onClose,
}) => {
  const camera = cameras.find(({ id }) => id === cameraId);

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-xl">
        {camera && (
          <>
            <DialogHeader>
              <DialogTitle>{camera.name}</DialogTitle>
              <DialogDescription>
                City traffic camera, updated about once a minute.
              </DialogDescription>
            </DialogHeader>
            <FadeInImage
              // Keyed so each camera fades in once its image has loaded.
              key={camera.id}
              src={liveImageUrl(camera)}
              alt={`Traffic camera at ${camera.name}`}
              width={320}
              height={240}
              className="aspect-[4/3] w-full rounded-md"
            />
            {cameras.length > 1 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {cameras.map(other => {
                  const selected = other.id === camera.id;
                  return (
                    <button
                      key={other.id}
                      type="button"
                      onClick={() => onSelect(other.id)}
                      aria-pressed={selected}
                      className={cn(
                        'focus-visible:ring-ring flex flex-col rounded-md p-1 text-left text-xs transition-opacity outline-none focus-visible:ring-2',
                        selected
                          ? 'ring-tpscalls-primary ring-2'
                          : 'opacity-70 hover:opacity-100'
                      )}
                    >
                      <FadeInImage
                        src={liveImageUrl(other)}
                        alt=""
                        width={320}
                        height={240}
                        className="aspect-[4/3] w-full rounded-sm"
                      />
                      <span className="mt-1 line-clamp-2 block">
                        {other.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CameraViewer;
