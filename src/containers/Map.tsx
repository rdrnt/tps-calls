import * as React from 'react';
import MapGL, { InteractiveState, ExtraState } from 'react-map-gl';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { UIState } from '../store/ui';
import { Dispatch } from 'redux';
import { Incident } from 'tps-calls-shared';

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

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapState {
  viewport: any;
}

interface MapProps {
  setInteractingWithMap: (isInteracting: boolean) => void;
  setSelectedMapIncident: (incident: Incident<any>) => void;
  toggleDrawerState: (value: boolean) => void;
  showLoader: (message?: string) => void;
  dismissLoader: () => void;
  ui: UIState;
  incidents: IncidentsState;
}

class Map extends React.Component<MapProps, MapState> {
  constructor(props: any) {
    super(props);

    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        ...DEFAULTS,
      },
    };
  }

  public componentDidMount() {
    const { showLoader } = this.props;
    showLoader('Loading map...');
    window.addEventListener('resize', this.manageWindowResizeListener);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.manageWindowResizeListener);
  }

  public manageWindowResizeListener = ({ target }: any) => {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        height: target.innerHeight,
        width: target.innerWidth,
      },
    }));
  };

  public updateViewport = (viewport: any) => {
    this.setState({
      viewport,
    });
  };

  public onMapInteraction = (
    interactionState: InteractiveState & ExtraState
  ) => {
    const { toggleDrawerState, setInteractingWithMap, ui } = this.props;
    if (interactionState.isDragging && !ui.isInteractingWithMap) {
      setInteractingWithMap(true);
      if (ui.drawerOpen) {
        toggleDrawerState(false);
      }
    } else if (!interactionState.isDragging && ui.isInteractingWithMap) {
      setInteractingWithMap(false);
    }
  };

  public render() {
    const { viewport } = this.state;
    const {
      incidents,
      toggleDrawerState,
      ui,
      dismissLoader,
      setSelectedMapIncident,
    } = this.props;
    return (
      <MapGL
        {...viewport}
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        mapStyle={MAPBOX_THEME_URL}
        onInteractionStateChange={this.onMapInteraction}
        onLoad={() => dismissLoader()}
      >
        <MapInfo
          toggleDrawer={toggleDrawerState}
          isInteractingWithMap={ui.isInteractingWithMap}
          drawerOpen={ui.drawerOpen}
          selectedIncident={incidents.selected}
        />
        {incidents.list.map(incident => (
          <MapMarker
            key={incident.id}
            latitude={incident.coordinates.latitude}
            longitude={incident.coordinates.longitude}
            onClick={() => setSelectedMapIncident(incident)}
          />
        ))}
      </MapGL>
    );
  }
}

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
