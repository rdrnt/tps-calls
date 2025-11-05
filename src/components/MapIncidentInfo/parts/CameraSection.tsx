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

interface CameraSectionProps {
  nearbyCameras: TorontoTrafficCamera[];
}

const CameraSection: FunctionComponent<CameraSectionProps> = ({
  nearbyCameras,
}) => {
  if (nearbyCameras.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Nearby Cameras</AccordionTrigger>
        <AccordionContent>
          <ItemGroup className="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-full">
            {nearbyCameras.map(parentCamera => {
              const defaultCameraView = parentCamera.cameras.find(
                camera => camera.direction === 'Default'
              );
              if (!defaultCameraView) {
                return null;
              }
              return (
                <Item key={parentCamera.id} variant={'outline'}>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CameraSection;
