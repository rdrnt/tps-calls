import * as React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import { Environment } from '../helpers';

interface MapState {
  viewport: any;
}

const MapboxMap = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY as string,
  minZoom: 11,
});

const DEFAULT_CENTER: [number, number] = [-79.3757384, 43.6858119];

// https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md

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
        center={DEFAULT_CENTER}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      />
    );
  }
}

export default Map;
