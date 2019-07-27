import { IncidentType, IncidentSourceType } from 'tps-calls-shared';

export const getIconForIncidentType = (incidentType: IncidentType): string => {
  switch (incidentType) {
    case IncidentType.STABBING:
      return '';
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
