import * as React from 'react';
import { AppState } from '../store';
import { connect, useDispatch } from 'react-redux';
import { UIState } from '../store/ui';
import { Incident } from 'tps-calls-shared';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import {
  setInteractingMap,
  toggleDrawer,
  openLoader,
  closeLoader,
} from '../store/ui/actions';
import { IncidentsState } from '../store/incidents';
import MapInfo from '../components/MapInfo';
import { setSelectedIncident } from '../store/incidents/actions';
import { MAPBOX_THEME_URL, Colors } from '../config';
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

interface MapProps {
  ui: UIState;
  incidents: IncidentsState;
}

const MapMapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY as string,
  minZoom: 9,
});

const Map: React.FunctionComponent<MapProps> = ({ incidents, ui }) => {
  const dispatch = useDispatch();
  const mapRef = React.useRef<any>();
  const [map, setMap] = React.useState<MapState | undefined>();

  React.useEffect(() => {
    dispatch(openLoader('Loading map...'));
  }, []);

  const onMapInteraction = (isDragging: boolean) => {
    console.log('Dragging?', isDragging);
    // If the map is being dragged and we haven't set the state in redux
    // Set the state to interacting
    if (isDragging) {
      dispatch(setInteractingMap(true));
      // If the drawer is open, close it
      if (ui.drawerOpen) {
        dispatch(toggleDrawer(false));
      }
    } else if (!isDragging) {
      dispatch(setInteractingMap(false));
    }
  };

  const closeDrawer = React.useCallback(() => {
    dispatch(toggleDrawer(false));
  }, [dispatch]);

  const onZoomChanged = (mapObj: any) => {
    console.log('selected', incidents.selected);
    if (mapObj.isZooming()) {
      console.log('Zooming');
    } else if (!mapObj.isZooming()) {
      console.log('Not zooming');
    }
  };

  React.useEffect(() => {
    if (incidents.selected && mapRef.current) {
      // Save the previous position
      console.log('mapref', mapRef.current);

      mapRef.current.flyTo({
        center: [
          incidents.selected.coordinates.longitude,
          incidents.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 14,
      });
    } else if (!incidents.selected && mapRef.current) {
    }
  }, [incidents.selected]);

  return (
    <MapMapbox
      style={MAPBOX_THEME_URL}
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      center={[DEFAULTS.longitude, DEFAULTS.latitude]}
      onStyleLoad={map => {
        mapRef.current = map;
        dispatch(closeLoader());
      }}
      onDragStart={e => {
        onMapInteraction(true);
      }}
      onDragEnd={() => onMapInteraction(false)}
      onClick={closeDrawer}
      onZoomStart={onZoomChanged}
      onZoomEnd={onZoomChanged}
    >
      <MapInfo
        toggleDrawer={(value: boolean) => dispatch(toggleDrawer(value))}
        isInteractingWithMap={ui.isInteractingWithMap}
        drawerOpen={ui.drawerOpen}
        selectedIncident={incidents.selected}
        setSelectedIncident={incident =>
          dispatch(setSelectedIncident(incident))
        }
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
        }}
      >
        {incidents.list.map(incident => (
          <Feature
            key={incident.id}
            coordinates={[
              incident.coordinates.longitude,
              incident.coordinates.latitude,
            ]}
            properties={{
              // https://docs.mapbox.com/mapbox-gl-js/example/data-driven-lines/
              color:
                incidents.selected && incidents.selected.id === incident.id
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

export const mapStateToProps = (state: AppState) => ({
  ui: state.ui,
  incidents: state.incidents,
});

export default connect(
  mapStateToProps,
  null
)(Map);
