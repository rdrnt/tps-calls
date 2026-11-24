import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface MapButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
  tooltipSide?: React.ComponentProps<typeof TooltipContent>['side'];
}

/** Icon button that floats over the map, labelled for screen readers and with a hover tooltip. */
const MapButton: React.FunctionComponent<MapButtonProps> = ({
  label,
  tooltipSide = 'top',
  className,
  ...props
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        size="icon-lg"
        aria-label={label}
        className={cn(
          'bg-background hover:bg-background/80 [&_svg]:text-primary',
          className
        )}
        {...props}
      />
    </TooltipTrigger>
    <TooltipContent side={tooltipSide}>{label}</TooltipContent>
  </Tooltip>
);

export default MapButton;
