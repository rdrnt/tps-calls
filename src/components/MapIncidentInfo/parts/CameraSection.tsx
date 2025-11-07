import { FunctionComponent, useMemo } from 'react';
import { TorontoTrafficCamera } from '../../../containers/BetaFeature';
import { Card, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Typography } from '../../Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '../../ui/item';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '../../ui/empty';
import { Cctv } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CameraSectionProps {
  nearbyCameras: TorontoTrafficCamera[];
}

const CameraSection: FunctionComponent<CameraSectionProps> = ({
  nearbyCameras,
}) => {
  if (nearbyCameras.length === 0) {
    return (
      <Empty className="bg-secondary">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Cctv />
          </EmptyMedia>
          <EmptyTitle>No nearby cameras</EmptyTitle>
        </EmptyHeader>
      </Empty>
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
