import * as React from 'react';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Permissions } from '../../helpers';
import {
  setLocationCoordinates,
  setLocationAvailable,
  setRequestingLocationPermissions,
} from '../../store/actions';
import { AppState, useAppDispatch, useAppSelector } from '../../store';

const LocationListener: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userLocationState = useAppSelector(
    (state: AppState) => state.user.location
  );

  const onUpdate = (coordinates: Coordinates) => {
    if (userLocationState.requesting) {
      dispatch(setRequestingLocationPermissions(false));
    }

    dispatch(
      setLocationCoordinates({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      })
    );
    dispatch(setLocationAvailable(true));
  };

  const onNotAvailable = () => {
    setRequestingLocationPermissions(false);
    dispatch(setLocationCoordinates(undefined));
    dispatch(setLocationAvailable(false));
  };

  React.useEffect(() => {
    if (Permissions.location.isSupported() && userLocationState.requesting) {
      Permissions.location.requestPermission({
        success: onUpdate,
        error: onNotAvailable,
      });
    }
  }, [userLocationState.requesting]);

  React.useEffect(() => {
    const isLocationAvailable = Boolean(window.navigator);
    if (isLocationAvailable !== userLocationState.available) {
      dispatch(setLocationAvailable(isLocationAvailable));
    }
  }, []);

  return null;
};

export default LocationListener;
