import * as React from 'react';
import MapGL, { InteractiveState } from 'react-map-gl';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { UIState } from '../store/ui';

import { setInteractingMap } from '../store/ui/actions';
import { Dispatch } from 'redux';

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapState {
  viewport: any;
}

interface MapProps {
  ui: UIState;
  dispatch: Dispatch;
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

  public onMapInteraction = interactionState => {
    const { dispatch, ui } = this.props;
    if (interactionState.isDragging && !ui.isInteractingWithMap) {
      dispatch(setInteractingMap(true));
    } else if (!interactionState.isDragging && ui.isInteractingWithMap) {
      dispatch(setInteractingMap(false));
    }
  };

  public render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
        onInteractionStateChange={this.onMapInteraction}
      />
    );
  }
}

export const mapStateToProps = (state: AppState) => ({
  ui: state.ui,
});

export default connect(
  mapStateToProps,
  null
)(Map);
