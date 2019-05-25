import * as React from 'react';
import ReactMapGL from 'react-map-gl';

interface MapState {
  viewport: any;
}

class Map extends React.Component<{}, MapState> {
  constructor(props: any) {
    super(props);
  }

  public setViewport = (viewport: any) => {
    this.setState({
      viewport,
    });
  };

  public render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.setViewport}
        />
      </div>
    );
  }
}

export default Map;
