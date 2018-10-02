import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';

import MapMarker from '../components/MapMarker';

import store from '../store';
import { incidentActions, uiActions } from '../actions';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      // Viewport is used for updating the map
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 43.653225,
        longitude: -79.383186,
        zoom: 10.3,
      },
      // Incidents is where we'll store all of the ongoing incidents (we get this info from the store)
      incidents: [],
      // selectedIncident is for controlling the clicked on incident (we get this info from the store)
      selectedIncident: null,
    };

    this.updateViewport = this.updateViewport.bind(this);
    this.setSelectedIncident = this.setSelectedIncident.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    store.dispatch(incidentActions.fetchIncidents());

    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents
    if (!nextProps.incidents.isFetching && nextProps.incidents.list) {
      this.setState({
        incidents: nextProps.incidents.list,
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

  setSelectedIncident(newSelectedincident) {
    const { selectedIncident } = this.state;
    const { dispatch } = this.props;
    if (!selectedIncident || newSelectedincident.id !== selectedIncident.id) {
      // Set the new selcted incident in the store so we can use it in the drawer also if needed
      dispatch(uiActions.toggleMobileDrawer(true));
      dispatch(incidentActions.setSelectedIncident(newSelectedincident));
    }
  }

  updateViewport(viewport) {
    this.setState({ viewport });
  }

  render() {
    const { incidents, viewport } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAP_APIKEY}
        {...viewport}
        onViewportChange={newViewport => this.updateViewport(newViewport)}
        minZoom={8.5}
      >
        {incidents.map(incident => (
          <MapMarker
            incident={incident}
            onClick={() => this.setSelectedIncident(incident)}
            key={incident.id}
          />
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
