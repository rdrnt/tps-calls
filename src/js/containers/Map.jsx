import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';

import MapMarker from '../components/MapMarker';
import MapPopover from '../components/MapPopover';

import store from '../store';
import { policeApiActions } from '../actions';

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
      // Incidents is where we'll store all of the ongoing incidents
      incidents: [],
      // selectedIncident is for controlling the clicked on incident
      selectedIncident: {
        id: 0,
        anchorEl: null, // This is used for the Popover
        show: false, // Used to show/hide popover
      },
    };

    this.updateViewport = this.updateViewport.bind(this);
    this.setSelectedIncident = this.setSelectedIncident.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.closePopper = this.closePopper.bind(this);
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

  setSelectedIncident(incident, event) {
    const { currentTarget } = event;
    const { selectedIncident } = this.state;
    if (
      currentTarget !== selectedIncident.anchorEl &&
      incident.id !== selectedIncident.id
    ) {
      // console.log('Updating state', selectedIncident, currentTarget);
      this.setState({
        selectedIncident: {
          ...incident,
          anchorEl: event.currentTarget,
          show: true,
        },
      });
    }
  }

  // Popover is the
  closePopper() {
    const { selectedIncident } = this.state;
    this.setState({
      selectedIncident: {
        show: !selectedIncident.show,
      },
    });
  }

  updateViewport(viewport) {
    this.setState({ viewport });
  }

  render() {
    const { incidents, selectedIncident, viewport } = this.state;
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
            onClick={event => this.setSelectedIncident(incident, event)}
            selected={selectedIncident.id === incident.id}
            key={incident.id}
          />
        ))}
        <MapPopover
          incident={selectedIncident}
          closePopper={this.closePopper}
        />
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
