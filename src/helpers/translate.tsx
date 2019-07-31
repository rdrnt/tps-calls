import * as React from 'react';
import { IncidentType, IncidentSourceType } from 'tps-calls-shared';
import { GiKnifeThrust } from 'react-icons/gi';

export const getIconForIncidentType = (incidentType: IncidentType) => {
  switch (incidentType) {
    case IncidentType.STABBING:
      return <GiKnifeThrust />;
    default:
      return '';
  }
};

export const getNameForIncidentSource = (
  source: IncidentSourceType,
  shorthand?: boolean
): string => {
  switch (source) {
    case IncidentSourceType.TORONTO_POLICE:
      return 'Toronto Police Services';

    default:
      return '';
  }
};
