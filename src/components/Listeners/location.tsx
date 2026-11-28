import * as React from 'react';
import { toast } from 'sonner';

import * as Permissions from '../../helpers/permissions';
import {
  setLocationCoordinates,
  setLocationAvailable,
  setRequestingLocationPermissions,
} from '../../store/actions';
import { AppState, useAppDispatch, useAppSelector } from '../../store';

const LocationListener: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const requesting = useAppSelector(
    (state: AppState) => state.user.location.requesting
  );

  React.useEffect(() => {
    dispatch(setLocationAvailable(Permissions.location.isSupported()));
  }, [dispatch]);

  React.useEffect(() => {
    if (!requesting) return;

    if (!Permissions.location.isSupported()) {
      dispatch(setRequestingLocationPermissions(false));
      return;
    }

    Permissions.location.requestPermission({
      success: ({ latitude, longitude }) => {
        dispatch(setRequestingLocationPermissions(false));
        dispatch(setLocationCoordinates({ latitude, longitude }));
      },
      // Keep the button so the user can retry after fixing the cause.
      error: error => {
        dispatch(setRequestingLocationPermissions(false));
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('Location access is off', {
            description:
              'Allow location for this site in your browser settings, then try again.',
            position: 'top-center',
          });
        } else {
          toast.error("Couldn't find your location", {
            description: 'Try again in a moment.',
            position: 'top-center',
          });
        }
      },
    });
  }, [requesting, dispatch]);

  return null;
};

export default LocationListener;
