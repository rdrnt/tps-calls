import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Incident } from '@rdrnt/tps-calls-shared';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { TorontoTrafficCamera } from '../../containers/BetaFeature';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';

interface MapCameraInfoProps {
  camera?: TorontoTrafficCamera;
  drawerOpen: boolean;
  close: () => void;
}

const MapIncidentInfo: React.FunctionComponent<MapCameraInfoProps> = ({
  camera,
  drawerOpen,
  close,
}) => {
  const cameraDefault = camera?.cameras.find(
    cam => cam.direction === 'Default'
  );
  const otherCams =
    camera?.cameras.filter(cam => cam.direction !== 'Default') ?? [];

  return (
    <AnimatePresence>
      {camera && !drawerOpen && (
        <Card className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-auto sm:w-full md:w-auto min-w-[375px] p-6">
          <CardHeader className="gap-1 px-0">
            <CardTitle className="text-2xl font-bold">{camera.name}</CardTitle>
            <CardDescription className="text-base text-primary">
              {camera.location.latitude.toFixed(4)},{' '}
              {camera.location.longitude.toFixed(4)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cameraDefault && (
              <div>
                <img
                  src={cameraDefault.imageUrl}
                  alt={cameraDefault.direction}
                />
              </div>
            )}
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {otherCams.map(cameraView => (
                <AccordionItem
                  key={cameraView.direction}
                  value={cameraView.direction}
                >
                  <AccordionTrigger>{cameraView.direction}</AccordionTrigger>
                  <AccordionContent>
                    <img src={cameraView.imageUrl} alt={cameraView.direction} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button size="sm" onClick={close}>
              Close
            </Button>
          </CardFooter>
        </Card>
      )}
    </AnimatePresence>
  );
};

export default MapIncidentInfo;
