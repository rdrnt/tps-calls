import { FunctionComponent } from 'react';
import { Cctv } from 'lucide-react';

import { TorontoTrafficCamera } from '../../../containers/BetaFeature';

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

interface CameraSectionProps {
  nearbyCameras: TorontoTrafficCamera[];
}

const CameraSection: FunctionComponent<CameraSectionProps> = ({
  nearbyCameras,
}) => {
  if (nearbyCameras.length === 0) {
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

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h5">Nearby Cameras</Typography>
      <ItemGroup
        className={cn(
          `grid gap-2 max-w-full`,
          // Mobile: if 3+ items → 3 cols, else → 2 cols
          nearbyCameras.length >= 3 ? 'grid-cols-3' : 'grid-cols-2',
          // Desktop (md+): if 1 item → 1 col, else → 2 cols
          nearbyCameras.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'
        )}
      >
        {nearbyCameras.map(parentCamera => {
          const defaultCameraView = parentCamera.cameras.find(
            camera => camera.direction === 'Default'
          );
          if (!defaultCameraView) {
            return null;
          }
          return (
            <Item
              key={parentCamera.id}
              variant={'outline'}
              className="p-2 gap-2"
            >
              <ItemHeader>
                <img
                  src={defaultCameraView.imageUrl}
                  alt={`An image of the ${defaultCameraView.direction} direction of the ${parentCamera.name}`}
                  className="rounded-sm object-cover"
                />
              </ItemHeader>
              <ItemContent>
                <ItemTitle>{parentCamera.name}</ItemTitle>
              </ItemContent>
            </Item>
          );
        })}
      </ItemGroup>
    </div>
  );
};

export default CameraSection;
