import * as React from 'react';
import { AppState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates, Incident } from '@rdrnt/tps-calls-shared';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { match } from 'react-router';

import {
  toggleDrawer,
  openLoader,
  closeLoader,
  openModal,
  showToast,
} from '../store/ui/actions';
import { setSelectedIncident } from '../store/incidents/actions';
import { setRequestingLocationPermissions } from '../store/user/actions';
import { MAPBOX_THEME_URL, Colors, Sizes } from '../config';
import { useScreenSize } from '../helpers/hooks';
import { Environment, Analytics } from '../helpers';

import MapIncidentInfo from '../components/MapIncidentInfo';
import MapOverlayButton from '../components/MapOverlayButton';
import AnimatedMapMarker from '../components/MapMarker/Animated';

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapState {
  position: Coordinates;
  zoom: number;
}

interface MapProps {
  match: match<{ id?: string }>;
}

const MapMapbox = ReactMapboxGl({
  accessToken: Environment.config.MAPBOX_API_KEY,
  minZoom: 9,
  attributionControl: false,
});

const Map: React.FunctionComponent<MapProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { incidents, ui, user } = useSelector((state: AppState) => state);
  const screenDimensions = useScreenSize();

  // https://github.com/alex3165/react-mapbox-gl/issues/461
  const [center, setCenter] = React.useState<[number, number]>([
    DEFAULTS.longitude,
    DEFAULTS.latitude,
  ]);
  const [mapState, setMapState] = React.useState<MapState | undefined>();

  const [isMapLoaded, setIsMapLoaded] = React.useState<boolean>(false);
  const [interactingWithMap, setInteractingWithMap] = React.useState<boolean>(
    false
  );

  const mapRef = React.useRef<any>();

  // Unselects the selected incident and animates to the users original position
  const unselectIncidentWithAnimation = (animated?: boolean) => {
    // Clear the selected incident
    dispatch(setSelectedIncident(undefined));

    // If we have the map state, go back to their original position
    // before they selected the incident
    if (animated && mapRef.current && mapState) {
      mapRef.current.flyTo({
        center: [mapState.position.longitude, mapState.position.latitude],
        speed: 1,
        zoom: mapState.zoom,
      });
    }

    // Reset the map state
    setMapState(undefined);
  };

  React.useEffect(() => {
    // if the map isn't loaded, show the loader
    if (!isMapLoaded && !ui.loader.open) {
      dispatch(openLoader('Loading map...'));
      Analytics.pageview('/map');
    }

    // if the map has been loaded, and we have a list of incidents
    if (isMapLoaded && incidents.list.length !== 0) {
      // Close the loader if it's open
      if (ui.loader.open) {
        setTimeout(() => {
          dispatch(closeLoader());
        }, 500);
      }

      // If we have an id in the params, see if there's a matching incident in the list
      const { id } = match.params;
      if (id) {
        const matchingIncident: Incident<any> | undefined = incidents.list.find(
          incident => incident.id === id
        );
        if (matchingIncident) {
          // If there is a matching incident, set it as the selected incident
          dispatch(setSelectedIncident(matchingIncident));
        } else {
          dispatch(
            showToast({
              message: 'Incident no longer exists',
              options: {
                intent: 'error',
              },
            })
          );
        }
      }
    }
  }, [isMapLoaded, incidents.list.length, match.params.id]);

  // Close the drawer if we're interacting with the map & the drawer is open d
  React.useEffect(() => {
    if (interactingWithMap) {
      if (ui.drawerOpen) {
        dispatch(toggleDrawer(false));
      }

      if (incidents.selected) {
        dispatch(setSelectedIncident(undefined));
      }
    }
  }, [interactingWithMap]);

  React.useEffect(() => {
    if (user.location.coordinates) {
      setCenter([
        user.location.coordinates.longitude,
        user.location.coordinates.latitude,
      ]);
    }
  }, [user.location.coordinates]);

  React.useEffect(() => {
    // If the selected incident changes, zoom into it
    if (incidents.selected && mapRef.current) {
      const currentPosition: {
        lat: number;
        lng: number;
      } = mapRef.current.getCenter();
      // Save the map state
      setMapState({
        zoom: mapRef.current.getZoom(),
        position: {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
        },
      });

      mapRef.current.flyTo({
        center: [
          incidents.selected.coordinates.longitude,
          incidents.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [incidents.selected]);

  // If the screen size changes, resize the map
  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [screenDimensions]);

  return (
    <MapMapbox
      style={MAPBOX_THEME_URL}
      containerStyle={{
        height: screenDimensions.height,
        width: screenDimensions.width,
      }}
      center={center}
      onStyleLoad={map => {
        mapRef.current = map;
        setIsMapLoaded(true);
      }}
      onDragStart={() => {
        setInteractingWithMap(true);
      }}
      onDragEnd={() => {
        setInteractingWithMap(false);
      }}
      onClick={() => {
        if (ui.drawerOpen) {
          dispatch(toggleDrawer(false));
        }

        if (incidents.selected) {
          dispatch(setSelectedIncident(undefined));
        }
      }}
    >
      {/* Overlay button for opening the drawer */}
      <MapOverlayButton
        hidden={ui.drawerOpen}
        onClick={() => dispatch(toggleDrawer(true))}
        iconName="menu"
        position={{ top: Sizes.SPACING, left: Sizes.SPACING }}
      />
      {/* Overlay button for opening the project info */}
      <MapOverlayButton
        hidden={Boolean(ui.drawerOpen || incidents.selected)}
        onClick={() => dispatch(openModal('project-info'))}
        iconName="info"
        position={{ bottom: Sizes.SPACING, right: Sizes.SPACING }}
        size={30}
      />
      {/* Overlay button for users location */}
      <MapOverlayButton
        hidden={Boolean(
          ui.drawerOpen || incidents.selected || !user.location.available
        )}
        onClick={() => dispatch(setRequestingLocationPermissions(true))}
        iconName="position"
        position={{ bottom: Sizes.SPACING, right: Sizes.SPACING * 4 }}
        size={30}
      />

      <MapIncidentInfo
        incident={incidents.selected}
        drawerOpen={ui.drawerOpen}
        close={() => unselectIncidentWithAnimation(true)}
      />

      {user.location.coordinates && (
        <AnimatedMapMarker
          color={Colors.BLACK}
          coordinates={user.location.coordinates}
          size={10}
        />
      )}

      {incidents.selected && (
        <AnimatedMapMarker
          color="#007bff"
          coordinates={incidents.selected.coordinates}
          size={20}
        />
      )}

      <Layer
        type="circle"
        id="marker"
        paint={{
          'circle-radius': {
            stops: [
              // [zoom, radius]
              [9, 4],
              [11, 6],
              [14, 8],
            ],
          },
          // Gets the color from the feature properties
          'circle-color': Colors.PRIMARY,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
        }}
      >
        {/* The incident features */}
        {incidents.list
          .map(incident => {
            const selected = Boolean(
              incidents.selected && incidents.selected.id === incident.id
            );
            if (!selected) {
              return (
                <Feature
                  key={incident.id}
                  coordinates={[
                    incident.coordinates.longitude,
                    incident.coordinates.latitude,
                  ]}
                  onClick={() => {
                    dispatch(setSelectedIncident(incident));
                  }}
                />
              );
            }

            return null;
          })
          .filter(incidentFeature => Boolean(incidentFeature))}
      </Layer>
    </MapMapbox>
  );
};

export default Map;
