import * as React from 'react';

import { Item, ItemDescription, ItemTitle, ItemContent } from '../../ui/item';

import * as DateHelper from '../../../helpers/date';
import { LocalIncident } from '../../../types';

interface MapSidebarItemProps {
  incident: LocalIncident;
  onClick: () => void;
}

const MapSidebarItem: React.FunctionComponent<MapSidebarItemProps> = ({
  incident,
  onClick,
}) => (
  // A real button, so rows can be reached with Tab and opened with Enter.
  <Item
    asChild
    className="bg-accent hover:bg-muted/40 text-foreground mt-0 mb-2 w-full"
  >
    <button type="button" onClick={onClick}>
      <ItemContent className="text-left">
        <ItemTitle className="font-bold">{incident.name}</ItemTitle>
        <ItemTitle>{incident.location}</ItemTitle>
        <ItemDescription className="text-left text-neutral-500">
          {DateHelper.formatIncidentDate(new Date(incident.date))}
        </ItemDescription>
      </ItemContent>
    </button>
  </Item>
);

export default MapSidebarItem;
