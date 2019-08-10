import * as React from 'react';
import MapGL, {
  InteractiveState,
  ExtraState,
  FlyToInterpolator,
} from 'react-map-gl';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { UIState } from '../store/ui';
import { Dispatch } from 'redux';
import { Incident } from 'tps-calls-shared';
import { easeCubic } from 'd3-ease';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';

import {
  setInteractingMap,
  toggleDrawer,
  openLoader,
  closeLoader,
} from '../store/ui/actions';
import MapMarker from '../components/MapMarker';
import { IncidentsState } from '../store/incidents';
import MapInfo from '../components/MapInfo';
import { setSelectedIncident } from '../store/incidents/actions';
import { MAPBOX_THEME_URL } from '../config';
import { PoseGroup } from 'react-pose';

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapProps {
  setInteractingWithMap: (isInteracting: boolean) => void;
  setSelectedMapIncident: (incident: Incident<any>) => void;
  toggleDrawerState: (value: boolean) => void;
  showLoader: (message?: string) => void;
  dismissLoader: () => void;
  ui: UIState;
  incidents: IncidentsState;
}

const MapMapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY as string,
});

const Map: React.FunctionComponent<MapProps> = ({
  incidents,
  toggleDrawerState,
  ui,
  dismissLoader,
  setSelectedMapIncident,
  setInteractingWithMap,
  showLoader,
}) => {
  const [viewport, setViewport] = React.useState<any>({
    width: window.innerWidth,
    height: window.innerHeight,
    ...DEFAULTS,
  });

  const onWindowResize = ({ target }: any) => {
    setViewport((prevState: any) => ({
      viewport: {
        ...prevState.viewport,
        height: target.innerHeight,
        width: target.innerWidth,
      },
    }));
  };

  const onMapInteraction = (
    interactionState: InteractiveState & ExtraState
  ) => {
    if (interactionState.isDragging && !ui.isInteractingWithMap) {
      setInteractingWithMap(true);
      if (ui.drawerOpen) {
        toggleDrawerState(false);
      }
    } else if (!interactionState.isDragging && ui.isInteractingWithMap) {
      setInteractingWithMap(false);
    }
  };

  React.useEffect(() => {
    //showLoader('Loading map...');
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  React.useEffect(() => {
    if (incidents.selected) {
      const newViewport = {
        ...viewport,
        ...incidents.selected.coordinates,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      };

      setViewport(newViewport);
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
    >
      {/*
      <MapInfo
        toggleDrawer={toggleDrawerState}
        isInteractingWithMap={ui.isInteractingWithMap}
        drawerOpen={ui.drawerOpen}
        selectedIncident={incidents.selected}
      />
      */}
      <Layer type="symbol" layout={{ 'icon-image': 'harbor-15' }} />
    </MapMapbox>
  );
};

export const mapStateToProps = (state: AppState) => ({
  ui: state.ui,
  incidents: state.incidents,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  setInteractingWithMap: (isInteracting: boolean) =>
    dispatch(setInteractingMap(isInteracting)),
  setSelectedMapIncident: (incident: Incident<any>) =>
    dispatch(setSelectedIncident(incident)),
  toggleDrawerState: (value: boolean) => dispatch(toggleDrawer(value)),
  showLoader: (message?: string) => dispatch(openLoader(message)),
  dismissLoader: () => dispatch(closeLoader()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
