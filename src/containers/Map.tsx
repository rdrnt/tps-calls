import * as React from 'react';
import { AppState } from '../store';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UIState } from '../store/ui';
import { Incident } from 'tps-calls-shared';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { toggleDrawer, openLoader, closeLoader } from '../store/ui/actions';
import { IncidentsState } from '../store/incidents';
import MapInfo from '../components/MapInfo';
import { setSelectedIncident } from '../store/incidents/actions';
import { MAPBOX_THEME_URL, Colors, Sizes } from '../config';
import { PoseGroup } from 'react-pose';
import { MapEvent } from 'react-mapbox-gl/lib/map-events';

interface MapState {
  center: Position;
  zoom: number;
}

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapProps {}

const MapMapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY as string,
  minZoom: 9,
});

const Map: React.FunctionComponent<MapProps> = ({}) => {
  const dispatch = useDispatch();
  const incidentsState = useSelector((state: AppState) => state.incidents);
  const uiState = useSelector((state: AppState) => state.ui);
  // https://github.com/alex3165/react-mapbox-gl/issues/461
  const [center, setCenter] = React.useState<[number, number]>([
    DEFAULTS.longitude,
    DEFAULTS.latitude,
  ]);

  const mapRef = React.useRef<any>();
  const [map, setMap] = React.useState<MapState | undefined>();
  const [isInteracting, setIsInteracting] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(openLoader('Loading map...'));
  }, []);

  // Close the drawer if we're interacting with the map & the drawer is open
  React.useEffect(() => {
    if (isInteracting && uiState.drawerOpen) {
      dispatch(toggleDrawer(false));
    }
  }, [isInteracting]);

  const onZoomChanged = (mapObj: any) => {
    /*
    console.log('selected', incidents.selected);
    if (mapObj.isZooming()) {
      console.log('Zooming');
    } else if (!mapObj.isZooming()) {
      console.log('Not zooming');
    }
    */
  };

  React.useEffect(() => {
    if (incidentsState.selected && mapRef.current) {
      // Save the previous position
      console.log('mapref', mapRef.current);

      mapRef.current.flyTo({
        center: [
          incidentsState.selected.coordinates.longitude,
          incidentsState.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [incidentsState.selected]);

  return (
    <MapMapbox
      style={MAPBOX_THEME_URL}
      containerStyle={{
        height: '100vh',
        width: uiState.drawerOpen
          ? `${window.innerWidth - Sizes.DRAWER_WIDTH}px`
          : '100vw',
      }}
      center={center}
      onStyleLoad={map => {
        mapRef.current = map;
        dispatch(closeLoader());
      }}
      onDragStart={() => {
        setIsInteracting(true);
      }}
      onDragEnd={() => {
        setIsInteracting(false);
      }}
      onClick={
        uiState.drawerOpen ? () => dispatch(toggleDrawer(false)) : undefined
      }
      onZoomStart={onZoomChanged}
      onZoomEnd={onZoomChanged}
    >
      <MapInfo
        toggleDrawer={(value: boolean) => dispatch(toggleDrawer(value))}
        dim={uiState.drawerOpen || isInteracting}
      />
      <Layer
        type="circle"
        id="marker"
        paint={{
          'circle-radius': {
            property: 'task-priority',
            type: 'categorical',
            stops: [[1, 5], [5, 5], [10, 10]],
          },
          // Gets the color from the feature properties
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
        }}
      >
        {incidentsState.list.map(incident => (
          <Feature
            key={incident.id}
            coordinates={[
              incident.coordinates.longitude,
              incident.coordinates.latitude,
            ]}
            properties={{
              // https://docs.mapbox.com/mapbox-gl-js/example/data-driven-lines/
              color:
                incidentsState.selected &&
                incidentsState.selected.id === incident.id
                  ? Colors.SECONDARY
                  : Colors.PRIMARY,
            }}
            onClick={() => {
              dispatch(setSelectedIncident(incident));
            }}
          />
        ))}
      </Layer>
    </MapMapbox>
  );
};

export default Map;
