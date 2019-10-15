import { Coordinates } from '@rdrnt/tps-calls-shared';

export const isSupported = (): boolean => Boolean(window.navigator);

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
      console.log('Error');
      error();
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60,
    }
  );
