import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';

import MapPin from '../components/MapPin';

import store from '../store';
import { policeApiActions } from '../actions';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 43.653225,
        longitude: -79.383186,
        zoom: 10.3,
      },
      incidents: [],
    };

    this.updateViewport = this.updateViewport.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    store.dispatch(policeApiActions.fetchIncidents());

    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents
    if (!nextProps.policeApi.isFetching && nextProps.policeApi.incidents) {
      this.setState({
        incidents: nextProps.policeApi.incidents,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize(values) {
    // console.log('The values', values);
    const { target } = values;
    const { viewport } = this.state;
    if (
      viewport.width !== target.innerWidth ||
      viewport.height !== target.innerHeight
    ) {
      this.setState({
        viewport: {
          ...viewport,
          height: target.innerHeight,
          width: target.innerWidth,
        },
      });
    }
  }

  updateViewport(viewport) {
    this.setState({ viewport });
  }

  render() {
    const { incidents } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAP_APIKEY}
        {...this.state.viewport}
        onViewportChange={viewport => this.updateViewport(viewport)}
        minZoom={8.5}
      >
        {incidents.map(incident => (
          <Marker
            latitude={incident.coordinates[1]}
            longitude={incident.coordinates[0]}
            offsetLeft={0}
            offsetTop={0}
            key={incident.id}
          >
            <MapPin
              onClick={() => console.log(incident.street, incident.type)}
            />
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Map);
