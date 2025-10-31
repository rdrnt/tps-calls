import * as React from 'react';
import styled from 'styled-components';
import { Incident } from '@rdrnt/tps-calls-shared';

import Text from '../../Text';
import {
  Item,
  ItemActions,
  ItemDescription,
  ItemTitle,
  ItemMedia,
  ItemHeader,
  ItemContent,
  ItemFooter,
} from '../../ui/item';

import { DateHelper } from '../../../helpers';

interface MapSidebarItemProps {
  incident: Incident<any>;
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
      <ItemContent>
        <ItemTitle className="font-bold">{incident.name}</ItemTitle>
        <ItemTitle>{incident.location}</ItemTitle>
        <ItemDescription className="text-left text-neutral-500">
          {DateHelper.formatIncidentDate(incident.date)}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default MapSidebarItem;
