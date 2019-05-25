import * as React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { Environment } from '../helpers';

interface MapState {
  viewport: any;
}

const MapboxMap = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY as string,
});

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
      <MapboxMap
        style="mapbox://styles/drnt/cjmwb7zbo1f5b2ro8sqfdkaql"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      />
    );
  }
}

export default Map;
