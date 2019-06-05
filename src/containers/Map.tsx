import * as React from 'react';
import MapGL, { InteractiveState, ExtraState } from 'react-map-gl';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { UIState } from '../store/ui';

import { setInteractingMap, toggleDrawer } from '../store/ui/actions';
import { Dispatch } from 'redux';
import MapMarker from '../components/MapMarker';
import { IncidentsState } from '../store/incidents';

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
  toggleDrawerState: (value: boolean) => void;
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
    const { incidents } = this.props;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        onInteractionStateChange={this.onMapInteraction}
      >
        {incidents.list.map(incident => (
          <MapMarker
            latitude={incident.coordinates.latitude}
            longitude={incident.coordinates.longitude}
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
  toggleDrawerState: (value: boolean) => dispatch(toggleDrawer(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
