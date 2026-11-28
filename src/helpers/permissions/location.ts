import { Coordinates } from '@rdrnt/tps-calls-shared';

export const isSupported = (): boolean =>
  typeof window !== 'undefined' && 'geolocation' in window.navigator;

interface RequestPermissionParams {
  success: (coordinates: Coordinates) => void;
  error: (error: GeolocationPositionError) => void;
}
export const requestPermission = ({
  success,
  error,
}: RequestPermissionParams): void =>
  navigator.geolocation.getCurrentPosition(
    event => {
      success(event.coords);
    },
    error,
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 9000,
    }
  );
