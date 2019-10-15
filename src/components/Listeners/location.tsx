import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Permissions } from '../../helpers';
import {
  setLocationCoordinates,
  setLocationAvailable,
  setRequestingLocationPermissions,
} from '../../store/user/actions';
import { AppState } from '../../store';

interface LocationListener {}

const LocationListener: React.FunctionComponent<LocationListener> = ({}) => {
  const dispatch = useDispatch();
  const userLocationState = useSelector(
    (state: AppState) => state.user.location
  );

  const onUpdate = (coordinates: Coordinates) => {
    if (userLocationState.requesting) {
      dispatch(setRequestingLocationPermissions(false));
    }
    dispatch(setLocationCoordinates(coordinates));
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

  return null;
};

export default LocationListener;
