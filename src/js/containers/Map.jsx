import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';

import MapMarker from '../components/MapMarker';
import MapFloatingButton from '../components/MapFAButton';
import MapCurrentSelected from '../components/MapCurrentSelected';

import { analyticsHelper, mapHelper } from '../helpers';

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
    this.toggleDrawer = this.toggleDrawer.bind(this);

    this.mapRef = null;
  }

  componentDidMount() {
    // Get the incidents
    store.dispatch(incidentActions.fetchIncidents());
    // Create a listener if the window size changes
    window.addEventListener('resize', this.onWindowResize);
    // Log a page view in the analytics (only in PROD)
    analyticsHelper.pageView('Map');
  }

  componentWillReceiveProps(nextProps) {
    // If we have a new selected incident, animate to it
    if (nextProps.incidents.selectedIncident !== this.state.selectedIncident) {
      const selectedCoords = nextProps.incidents.selectedIncident.coordinates;

      // Animate to the new selected incident on the map
      this.updateViewport(this.state.viewport, true, selectedCoords);

      // Close the drawer
      this.toggleDrawer(false);
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
    // Unmount the listener
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
  }

  updateViewport(
    oldViewport,
    animateToCentre = false,
    coordinates = { lat: 0, lon: 0 }
  ) {
    const mapGL = this.mapRef.getMap();
    const bounds = mapGL.getBounds();

    const { incidents } = this.props;

    // This will be the viewport we use in the end
    const newViewport = animateToCentre
      ? mapHelper.animateViewportToCentre(oldViewport, bounds, coordinates)
      : oldViewport;

    // Use props because we always want to use all the incidents
    // And we cant do that if we edit the state
    // But what we're doing is only rendering incidents that are on the map
    const chordsBeingShown = incidents.list.filter(incident =>
      mapHelper.isMarkerInBounds(bounds, incident)
    );

    this.setState({
      viewport: { ...newViewport },
      incidents: chordsBeingShown,
    });
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
        <MapCurrentSelected
          hidden={showDrawer}
          selectedIncident={selectedIncident}
        />
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
