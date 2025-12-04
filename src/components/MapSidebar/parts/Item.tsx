import * as React from 'react';

import { Item, ItemDescription, ItemTitle, ItemContent } from '../../ui/item';

import { DateHelper } from '../../../helpers';
import { LocalIncident } from '../../../types';

interface MapSidebarItemProps {
  incident: LocalIncident;
  onClick: () => void;
}

const MapSidebarItem: React.FunctionComponent<MapSidebarItemProps> = ({
  incident,
  onClick,
}) => {
  return (
    <Item
      onClick={onClick}
      className="bg-accent hover:bg-muted/40 mb-2 text-foreground mt-0 hover:cursor-pointer"
    >
      <ItemContent className="text-left">
        <ItemTitle className="font-bold">{incident.name}</ItemTitle>
        <ItemTitle>{incident.location}</ItemTitle>
        <ItemDescription className="text-left text-neutral-500">
          {DateHelper.formatIncidentDate(new Date(incident.date))}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default MapSidebarItem;
