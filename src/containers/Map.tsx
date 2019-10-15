import * as React from 'react';
import { AppState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates, Incident } from '@rdrnt/tps-calls-shared';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { darken } from 'polished';
import { match } from 'react-router';

import { toggleDrawer, openLoader, closeLoader } from '../store/ui/actions';
import { setSelectedIncident } from '../store/incidents/actions';
import { MAPBOX_THEME_URL, Colors } from '../config';
import { useScreenSize } from '../helpers/hooks';
import { Environment } from '../helpers';

import MapInfo from '../components/MapInfo';
import MapDrawerButton from '../components/MapDrawerButton';

interface MapState {
  position: Coordinates;
  zoom: number;
}

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapProps {
  match: match<{ id?: string }>;
}

const MapMapbox = ReactMapboxGl({
  accessToken: Environment.config.MAPBOX_API_KEY,
  minZoom: 9,
});

const Map: React.FunctionComponent<MapProps> = ({ match }) => {
  const dispatch = useDispatch();
  const incidentsState = useSelector((state: AppState) => state.incidents);
  const uiState = useSelector((state: AppState) => state.ui);
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

  React.useEffect(() => {
    // if the map isn't loaded, show the loader
    if (!isMapLoaded && !uiState.loader.open) {
      dispatch(openLoader('Loading map...'));
    }

    // if the map has been loaded, and we have a list of incidents
    if (isMapLoaded && incidentsState.list.length !== 0) {
      // Close the loader if it's open
      if (uiState.loader.open) {
        setTimeout(() => {
          dispatch(closeLoader());
        }, 500);
      }

      // If we have an id in the params, see if there's a matching incident in the list
      const { id } = match.params;
      const matchingIncident: Incident<any> | undefined = id
        ? incidentsState.list.find(incident => incident.id === id)
        : undefined;
      // If there is a matching incident, set it as the selected incident
      if (matchingIncident) {
        dispatch(setSelectedIncident(matchingIncident));
      }
    }
  }, [isMapLoaded, incidentsState.list.length, match.params.id]);

  // Close the drawer if we're interacting with the map & the drawer is open d
  React.useEffect(() => {
    if (interactingWithMap) {
      if (uiState.drawerOpen) {
        dispatch(toggleDrawer(false));
      }

      if (incidentsState.selected) {
        dispatch(setSelectedIncident(undefined));
      }
    }
  }, [interactingWithMap]);

  React.useEffect(() => {
    if (incidentsState.selected && mapRef.current) {
      // Save the previous position
      const currentPosition: {
        lat: number;
        lng: number;
      } = mapRef.current.getCenter();
      setMapState({
        zoom: mapRef.current.getZoom(),
        position: {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
        },
      });

      mapRef.current.flyTo({
        center: [
          incidentsState.selected.coordinates.longitude,
          incidentsState.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    } else if (!incidentsState.selected && mapRef.current && mapState) {
      // if the incident is unselected, and we have the map state
      // go back to their original position before they selected the incident
      mapRef.current.flyTo({
        center: [mapState.position.longitude, mapState.position.latitude],
        speed: 1,
        zoom: mapState.zoom,
      });
      setMapState(undefined);
    }
  }, [incidentsState.selected]);

  // if the screen size changes, resize the map
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
        if (uiState.drawerOpen) {
          dispatch(toggleDrawer(false));
        }

        if (incidentsState.selected) {
          dispatch(setSelectedIncident(undefined));
        }
      }}
    >
      <MapDrawerButton
        hidden={uiState.drawerOpen}
        openDrawer={() => dispatch(toggleDrawer(true))}
      />
      <MapInfo
        incident={incidentsState.selected}
        drawerOpen={uiState.drawerOpen}
      />

      <Layer
        type="circle"
        id="marker"
        paint={{
          'circle-radius': ['get', 'size'],
          // Gets the color from the feature properties
          'circle-color': ['get', 'color'],
          'circle-stroke-width': ['get', 'border'],
          'circle-stroke-color': '#FFFFFF',
        }}
      >
        {incidentsState.list.map(incident => {
          const selected = Boolean(
            incidentsState.selected &&
              incidentsState.selected.id === incident.id
          );
          return (
            <Feature
              key={incident.id}
              coordinates={[
                incident.coordinates.longitude,
                incident.coordinates.latitude,
              ]}
              properties={{
                // https://docs.mapbox.com/mapbox-gl-js/example/data-driven-lines/
                color: selected ? darken(0.2, Colors.PRIMARY) : Colors.PRIMARY,
                size: selected ? 8 : 6,
                border: selected ? 2 : 1,
              }}
              onClick={() => {
                dispatch(setSelectedIncident(incident));
              }}
            />
          );
        })}
      </Layer>
    </MapMapbox>
  );
};

export default Map;
