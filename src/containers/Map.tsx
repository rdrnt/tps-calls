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

  const onMapInteraction = (isDragging: boolean) => {
    /*
    if (isDragging) {
      if (!ui.isInteractingWithMap) {
        dispatch(setInteractingMap(true));
      }
      if (ui.drawerOpen) {
        dispatch(setInteractingMap(false));
      }
    } else if (!isDragging) {
      dispatch(setInteractingMap(false));
    }
    */
  };

  React.useEffect(() => {
    dispatch(openLoader('Loading map...'));
  }, []);

  React.useEffect(() => {
    if (incidents.selected && mapRef.current) {
      mapRef.current.flyTo({
        center: [
          incidents.selected.coordinates.longitude,
          incidents.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 14,
      });
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
      onDragStart={() => onMapInteraction(true)}
      onDragEnd={() => onMapInteraction(false)}
    >
      <MapInfo
        toggleDrawer={(value: boolean) => dispatch(toggleDrawer(value))}
        isInteractingWithMap={ui.isInteractingWithMap}
        drawerOpen={ui.drawerOpen}
        selectedIncident={incidents.selected}
      />
      <Layer
        type="symbol"
        id="marker"
        layout={{
          'icon-image': 'circle-15',
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        }}
      >
        {incidents.list.map(incident => (
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
