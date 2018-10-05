import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import { easeCubic } from 'd3-ease';

import MapMarker from '../components/MapMarker';
import MapFloatingButton from '../components/MapFAButton';

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
      showDrawer: false,
    };

    this.updateViewport = this.updateViewport.bind(this);
    this.setSelectedIncident = this.setSelectedIncident.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.animateToMarker = this.animateToMarker.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);

    this.mapRef = null;
  }

  componentDidMount() {
    store.dispatch(incidentActions.fetchIncidents());
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    // If we have a new selected incident, animate to it
    if (nextProps.incidents.selectedIncident !== this.state.selectedIncident) {
      const selectedCoords = nextProps.incidents.selectedIncident.coordinates;
      this.animateToMarker(selectedCoords.lat, selectedCoords.lon);
    }

    // Check if we're fetching and if we have any incidents
    if (!nextProps.incidents.isFetching && nextProps.incidents.list) {
      this.setState({
        incidents: nextProps.incidents.list,
        selectedIncident: nextProps.incidents.selectedIncident,
        showDrawer: nextProps.UI.showDrawer,
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

  setSelectedIncident(newSelectedIncident) {
    const { selectedIncident } = this.state;
    const { dispatch } = this.props;
    if (!selectedIncident || newSelectedIncident.id !== selectedIncident.id) {
      // Set the new selcted incident in the store so we can use it in the drawer also if needed
      dispatch(incidentActions.setSelectedIncident(newSelectedIncident));
    }

    // Animate on the map
    this.animateToMarker(
      newSelectedIncident.coordinates.lat,
      newSelectedIncident.coordinates.lon
    );

    // Always toggle it open
    dispatch(uiActions.toggleDrawer(true));
  }

  animateToMarker(lat, lon) {
    // Subtract 0.02 from the lat so it centers on mobile screens
    const mapGL = this.mapRef.getMap();
    const bounds = mapGL.getBounds();

    console.log('', mapGL);

    const viewport1 = new WebMercatorViewport({
      ...this.state.viewport,
    });

    console.log('', viewport1);

    const bound = viewport1.fitBounds(
      [[bounds._sw.lng, bounds._sw.lat], [bounds._ne.lng, bounds._ne.lat]],
      {
        padding: 0,
        offset: [0, 0],
      }
    );

    console.log('bound', bound);

    this.updateViewport({
      ...bound,
      height: this.state.viewport.height,
      latitude: lat,
      longitude: lon,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
  }

  updateViewport(viewport) {
    // console.log('Viewport');
    const mapGL = this.mapRef.getMap();
    const bounds = mapGL.getBounds();

    // Use props because we always want to use all the incidents
    // And we cant do that if we edit the state
    const chordsBeingShown = this.props.incidents.list.filter(
      incident =>
        incident.coordinates.lat <= bounds._ne.lat &&
        incident.coordinates.lon <= bounds._ne.lng &&
        (incident.coordinates.lat >= bounds._sw.lat &&
          incident.coordinates.lon >= bounds._sw.lng)
    );

    /*
    const coordsNotBeingShown = this.state.incidents.filter(
      incident => !chordsBeingShown.includes(incident)
    );
    */

    this.setState({ viewport, incidents: chordsBeingShown });
  }

  toggleDrawer(value) {
    const { dispatch } = this.props;

    dispatch(uiActions.toggleDrawer(value));
  }

  render() {
    const { incidents, selectedIncident, viewport, showDrawer } = this.state;
    return (
      <ReactMapGL
        ref={node => (this.mapRef = node)}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_APIKEY}
        {...viewport}
        onViewportChange={newViewport => this.updateViewport(newViewport)}
        minZoom={8.5}
      >
        {/* Markers on the map */}
        {incidents.map(incident => (
          <MapMarker
            incident={incident}
            onClick={() => this.setSelectedIncident(incident)}
            selected={
              selectedIncident ? selectedIncident.id === incident.id : false
            }
            key={incident.id}
          />
        ))}
        {/* Hide the button if the drawer is open */}
        <MapFloatingButton
          drawerOpen={showDrawer}
          onClick={() => this.toggleDrawer(!showDrawer)}
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
