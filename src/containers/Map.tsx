import * as React from 'react';
import { AppState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates, Incident } from '@rdrnt/tps-calls-shared';
import ReactMapGl, { MapRef } from 'react-map-gl';
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
import { Environment, Analytics } from '../helpers';
import * as FirebaseIncidents from '../helpers/firebase/incident';

import MapIncidentInfo from '../components/MapIncidentInfo';
import MapOverlayButton from '../components/MapOverlayButton';
import AnimatedMapMarker from '../components/MapMarker/Animated';
import MapMarker from '../components/MapMarker';

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

const Map: React.FunctionComponent<MapProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { incidents, ui, user } = useSelector((state: AppState) => state);

  // I want to reffer to mapRef instead of mapRef.current throughout the app
  // thats why theres two vars lol
  const refForMap = React.useRef<MapRef | undefined>();
  const mapRef = refForMap.current;

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

  // Unselects the selected incident and animates to the users original position
  const unselectIncidentWithAnimation = (animated?: boolean) => {
    // Clear the selected incident
    dispatch(setSelectedIncident(undefined));

    // If we have the map state, go back to their original position
    // before they selected the incident
    if (animated && mapRef && mapState) {
      mapRef.flyTo({
        center: [mapState.position.longitude, mapState.position.latitude],
        speed: 1,
        zoom: mapState.zoom,
      });
    }

    // Reset the map state
    setMapState(undefined);
  };

  // Finds and returns an incident from the store or database
  const getIncidentWithId = async (
    id: string,
    searchDB = false
  ): Promise<Incident<any> | undefined> => {
    const matchingIncident: Incident<any> | undefined = incidents.list.find(
      incident => incident.id === id
    );

    if (!matchingIncident && searchDB) {
      const incidentFromDB = await FirebaseIncidents.getIncidentFromId(id);
      return incidentFromDB;
    }

    return matchingIncident;
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

      setTimeout(() => {
        dispatch(closeLoader());
      }, 500);

      // If we have an id in the params, see if there's a matching incident in the db/store
      const { id } = match.params;
      if (id) {
        getIncidentWithId(id, true).then(incident => {
          if (!incident) {
            dispatch(
              showToast({
                message: 'Incident no longer exists',
                options: {
                  intent: 'error',
                },
              })
            );
          } else {
            dispatch(setSelectedIncident(incident));
          }
        });
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
    if (incidents.selected && mapRef) {
      const currentPosition = mapRef.getCenter();
      // Save the map state
      setMapState({
        zoom: mapRef.getZoom(),
        position: {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
        },
      });

      mapRef.flyTo({
        center: [
          incidents.selected.coordinates.longitude,
          incidents.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [incidents.selected]);

  return (
    <ReactMapGl
      ref={refForMap}
      mapboxAccessToken={Environment.config.MAPBOX_API_KEY}
      mapStyle={MAPBOX_THEME_URL}
      attributionControl={true}
      initialViewState={{
        latitude: 43.653225,
        longitude: -79.383186,
        zoom: 11.0,
      }}
      style={{ width: '100vw', height: '100vh' }}
      minZoom={9}
      //disables zooming while an incident is selected
      interactive={!incidents.selected}
      scrollZoom={!incidents.selected}
      onLoad={() => {
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
        position={{ bottom: Sizes.SPACING + 10, right: Sizes.SPACING }}
        size={30}
      />
      {/* Overlay button for users location */}
      <MapOverlayButton
        hidden={Boolean(
          ui.drawerOpen || incidents.selected || !user.location.available
        )}
        onClick={() => dispatch(setRequestingLocationPermissions(true))}
        iconName="position"
        position={{ bottom: Sizes.SPACING + 10, right: Sizes.SPACING * 4 }}
        size={30}
      />
      {/* Overlay button for users location */}
      <MapOverlayButton
        hidden={false}
        onClick={() => dispatch(openModal('mobile-app-download'))}
        iconName="new"
        position={{ bottom: Sizes.SPACING + 10, right: Sizes.SPACING * 7 }}
        size={25}
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
          size={22}
        />
      )}

      {/* The incident features */}
      {incidents.list
        .map(incident => {
          const selected = Boolean(
            incidents.selected && incidents.selected.id === incident.id
          );
          if (!selected) {
            return (
              <MapMarker
                key={incident.id}
                coordinates={incident.coordinates}
                onClick={() => {
                  if (!incidents.selected) {
                    dispatch(setSelectedIncident(incident));
                  }
                }}
              />
            );
          }

          return null;
        })
        .filter(incidentFeature => Boolean(incidentFeature))}
    </ReactMapGl>
  );
};

export default Map;
