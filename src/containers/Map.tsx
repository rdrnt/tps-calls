import * as React from 'react';
import { Coordinates, Incident } from '@rdrnt/tps-calls-shared';
import ReactMapGl, { AttributionControl, MapRef } from 'react-map-gl';
import { match } from 'react-router';
import {
  MenuIcon,
  NavigationIcon,
  InfoIcon,
  TabletSmartphoneIcon,
} from 'lucide-react';

import { MAPBOX_THEME_URL, Colors } from '../config';
import { Environment, Analytics } from '../helpers';
import * as FirebaseIncidents from '../helpers/firebase/incident';

import { useAppDispatch, useAppSelector } from '../store';

import MapIncidentInfo from '../components/MapIncidentInfo';
import AnimatedMapMarker from '../components/MapMarker/Animated';
import MapMarker from '../components/MapMarker';
import { Button } from '../components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '../components/ui/button-group';
import {
  closeLoader,
  openLoader,
  openModal,
  setRequestingLocationPermissions,
  setSelectedIncident,
  toggleDrawer,
} from '../store/actions';
import { toast } from 'sonner';
import MapSidebar from '../components/MapSidebar';
import { SafeArea } from '../components/SafeArea';

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

interface MapState {
  position: Coordinates;
  zoom: number;
}

interface MapProps {
  match: match<{ id?: string }>;
}

const Map: React.FunctionComponent<MapProps> = ({ match }) => {
  const dispatch = useAppDispatch();

  const incidents = useAppSelector(state => state.incidents);
  const ui = useAppSelector(state => state.ui);
  const user = useAppSelector(state => state.user);

  // I want to reffer to mapRef instead of mapRef.current throughout the app
  // thats why theres two vars lol
  const refForMap = React.useRef<MapRef | null>(null);
  const mapRef = refForMap.current;

  // https://github.com/alex3165/react-mapbox-gl/issues/461
  const [, setCenter] = React.useState<[number, number]>([
    DEFAULTS.longitude,
    DEFAULTS.latitude,
  ]);
  const [mapState, setMapState] = React.useState<MapState | undefined>();

  const [isMapLoaded, setIsMapLoaded] = React.useState<boolean>(false);
  const [interactingWithMap, setInteractingWithMap] =
    React.useState<boolean>(false);

  // Unselects the selected incident and animates to the users original position
  const unselectIncidentWithAnimation = (animated?: boolean) => {
    // Clear the selected incident
    dispatch(setSelectedIncident(undefined));

    // If we have the map state, go back to their original position
    // before they selected the incident
    if (animated && mapRef && mapState) {
      mapRef.flyTo({
        center: [mapState.position.longitude, mapState.position.latitude],
        speed: 1,
        zoom: mapState.zoom,
      });
    }

    // Reset the map state
    setMapState(undefined);
  };

  // Finds and returns an incident from the store or database
  const getIncidentWithId = async (
    id: string,
    searchDB = false
  ): Promise<Incident<any> | undefined> => {
    const matchingIncident: Incident<any> | undefined = incidents.list.find(
      incident => incident.id === id
    );

    if (!matchingIncident && searchDB) {
      const incidentFromDB = await FirebaseIncidents.getIncidentFromId(id);
      return incidentFromDB;
    }

    return matchingIncident;
  };

  React.useEffect(() => {
    // if the map isn't loaded, show the loader
    if (!isMapLoaded && !ui.loader.open) {
      dispatch(openLoader('Loading map...'));
      Analytics.pageview('/map');
    }

    // if the map has been loaded, and we have a list of incidents
    if (isMapLoaded && incidents.list.length !== 0) {
      // Close the loader if it's open

      setTimeout(() => {
        dispatch(closeLoader());
      }, 500);

      // If we have an id in the params, see if there's a matching incident in the db/store
      const { id } = match.params;
      if (id) {
        getIncidentWithId(id, true).then(incident => {
          if (!incident) {
            toast.error('Incident no longer exists', {
              description: 'The incident you are looking for no longer exists.',
              position: 'top-center',
            });
          } else {
            dispatch(setSelectedIncident(incident));
          }
        });
      }
    }
  }, [isMapLoaded, incidents.list.length, match.params.id]);

  // Close the drawer if we're interacting with the map & the drawer is open d
  React.useEffect(() => {
    if (interactingWithMap) {
      if (ui.drawerOpen) {
        dispatch(toggleDrawer(false));
      }

      if (incidents.selected) {
        dispatch(setSelectedIncident(undefined));
      }
    }
  }, [interactingWithMap]);

  React.useEffect(() => {
    if (user.location.coordinates) {
      setCenter([
        user.location.coordinates.longitude,
        user.location.coordinates.latitude,
      ]);
    }
  }, [user.location.coordinates]);

  React.useEffect(() => {
    // If the selected incident changes, zoom into it
    if (incidents.selected && mapRef) {
      const currentPosition = mapRef.getCenter();
      // Save the map state
      setMapState({
        zoom: mapRef.getZoom(),
        position: {
          latitude: currentPosition.lat,
          longitude: currentPosition.lng,
        },
      });

      mapRef.flyTo({
        center: [
          incidents.selected.coordinates.longitude,
          incidents.selected.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [incidents.selected]);

  return (
    <>
      <ReactMapGl
        ref={refForMap}
        mapboxAccessToken={Environment.config.MAPBOX_API_KEY}
        mapStyle={'mapbox://styles/drnt/cmh4091dh002w01sg6i7nb4sl'}
        attributionControl={false}
        initialViewState={{
          latitude: 43.653225,
          longitude: -79.383186,
          zoom: 11.0,
        }}
        style={{ width: '100vw', height: '100vh' }}
        minZoom={9}
        //disables zooming while an incident is selected
        interactive={!incidents.selected}
        scrollZoom={!incidents.selected}
        onLoad={() => {
          setIsMapLoaded(true);
        }}
        onDragStart={() => {
          setInteractingWithMap(true);
        }}
        onDragEnd={() => {
          setInteractingWithMap(false);
        }}
        onClick={() => {
          if (ui.drawerOpen) {
            dispatch(toggleDrawer(false));
          }
        }}
      >
        <SafeArea>
          <AttributionControl compact={true} position="bottom-left" />

          {/* Overlay button for opening the drawer */}
          {!ui.drawerOpen && (
            <Button
              size="icon-lg"
              className={`absolute top-[20px] left-[20px]`}
              onClick={() => dispatch(toggleDrawer(true))}
            >
              <MenuIcon />
            </Button>
          )}

          <MapIncidentInfo
            incident={incidents.selected}
            drawerOpen={ui.drawerOpen}
            close={() => unselectIncidentWithAnimation(true)}
          />

          <ButtonGroup
            className="absolute bottom-[25px] right-[25px]"
            hidden={Boolean(ui.drawerOpen || incidents.selected)}
          >
            <Button
              size="icon-lg"
              onClick={() => dispatch(openModal('mobile-app-download'))}
            >
              <TabletSmartphoneIcon />
            </Button>
            <ButtonGroupSeparator />
            {user.location.available && (
              <>
                <Button
                  size="icon-lg"
                  onClick={() =>
                    dispatch(setRequestingLocationPermissions(true))
                  }
                >
                  <NavigationIcon />
                </Button>
                <ButtonGroupSeparator />
              </>
            )}

            <Button
              size="icon-lg"
              onClick={() => dispatch(openModal('project-info'))}
            >
              <InfoIcon />
            </Button>
          </ButtonGroup>
        </SafeArea>

        {user.location.coordinates && (
          <AnimatedMapMarker
            color={Colors.BLACK}
            coordinates={user.location.coordinates}
            size={10}
          />
        )}

        {incidents.selected && (
          <AnimatedMapMarker
            color="#007bff"
            coordinates={incidents.selected.coordinates}
            size={22}
          />
        )}

        {/* The incident features */}
        {incidents.list
          .map(incident => {
            const selected = Boolean(
              incidents.selected && incidents.selected.id === incident.id
            );
            if (!selected) {
              return (
                <MapMarker
                  key={incident.id}
                  coordinates={incident.coordinates}
                  onClick={() => {
                    if (!incidents.selected) {
                      dispatch(setSelectedIncident(incident));
                    }
                  }}
                />
              );
            }

            return null;
          })
          .filter(incidentFeature => Boolean(incidentFeature))}
      </ReactMapGl>
      <MapSidebar
        isOpen={ui.drawerOpen}
        onClose={() => dispatch(toggleDrawer(false))}
      />
    </>
  );
};

export default Map;
