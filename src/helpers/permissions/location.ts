import { Coordinates } from '@rdrnt/tps-calls-shared';

export const isSupported = (): boolean =>
  Boolean('geolocation' in window.navigator);

interface RequestPermissionParams {
  success: (coordinates: Coordinates) => void;
  error: () => void;
}
export const requestPermission = ({
  success,
  error,
}: RequestPermissionParams): void =>
  navigator.geolocation.getCurrentPosition(
    event => {
      success(event.coords);
    },
    () => {
      error();
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 9000,
    }
  );
