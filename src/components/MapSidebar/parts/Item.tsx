import * as React from 'react';

import { Item, ItemDescription, ItemTitle, ItemContent } from '../../ui/item';
import { cn } from '../../../lib/utils';

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
  // Light: white card, pale blue with a blue outline on hover. Dark: grey card that lightens, with the same outline.
  <Item
    asChild
    className={cn(
      'text-foreground mt-0 mb-2 w-full duration-150',
      'bg-card border-border hover:border-tpscalls-primary hover:bg-[color-mix(in_oklab,var(--color-tpscalls-primary)_6%,var(--card))] active:bg-[color-mix(in_oklab,var(--color-tpscalls-primary)_12%,var(--card))]',
      'dark:bg-accent dark:hover:border-tpscalls-primary dark:border-transparent dark:hover:bg-[color-mix(in_oklab,var(--accent),var(--foreground)_7%)] dark:active:bg-[color-mix(in_oklab,var(--accent),var(--foreground)_12%)]'
    )}
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
