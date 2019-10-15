import { Coordinates } from '@rdrnt/tps-calls-shared';

export const isSupported = (): boolean => Boolean(window.navigator);

interface RequestPermissionParams {
  success: (coordinates: Coordinates) => void;
  error: () => void;
}
export const requestPermission = ({
  success,
  error,
}: RequestPermissionParams) => {
  if (isSupported()) {
    navigator.geolocation.getCurrentPosition(
      event => {
        console.log('Scuess', event);
      },
      () => {
        console.log('Error');
      }
    ),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 60,
      };
  }
};
