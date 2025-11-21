import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import { Coordinates, Incident } from '@rdrnt/tps-calls-shared';
import ReactMapGl, { AttributionControl, MapRef } from 'react-map-gl';
import { useParams } from 'react-router';
import {
  MenuIcon,
  NavigationIcon,
  InfoIcon,
  TabletSmartphoneIcon,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

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
  setSelectedCamera,
  setSelectedIncident,
  toggleDrawer,
} from '../store/actions';

import MapSidebar from '../components/MapSidebar';
import { SafeArea } from '../components/SafeArea';
import MapCameraInfo from '../components/MapCameraInfo';

const DEFAULTS = {
  latitude: 43.653225,
  longitude: -79.383186,
  zoom: 11.0,
};

const Map: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  const incidentList = useAppSelector(state => state.incidents.list);
  const selectedIncident = useAppSelector(state => state.incidents.selected);
  const filter = useAppSelector(state => state.incidents.filter);
  const { drawerOpen, loader } = useAppSelector(state => state.ui);
  const userLocation = useAppSelector(state => state.user.location);
  const cameraList = useAppSelector(state => state.cameras.list);
  const selectedCamera = useAppSelector(state => state.cameras.selected);

  // I want to reffer to mapRef instead of mapRef.current throughout the app
  // thats why theres two vars lol
  const refForMap = React.useRef<MapRef | null>(null);
  const mapRef = refForMap.current;

  // https://github.com/alex3165/react-mapbox-gl/issues/461
  const [, setCenter] = React.useState<[number, number]>([
    DEFAULTS.longitude,
    DEFAULTS.latitude,
  ]);

  const [isMapLoaded, setIsMapLoaded] = React.useState<boolean>(false);
  const [interactingWithMap, setInteractingWithMap] =
    React.useState<boolean>(false);

  // Finds and returns an incident from the store or database
  const getIncidentWithId = async (
    id: string,
    searchDB = false
  ): Promise<Incident<any> | undefined> => {
    const matchingIncident: Incident<any> | undefined = incidentList.find(
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
    if (!isMapLoaded && !loader.open) {
      dispatch(openLoader('Loading map...'));
      Analytics.pageview('/map');
    }

    // if the map has been loaded, and we have a list of incidents
    if (isMapLoaded && incidentList.length !== 0) {
      // Close the loader if it's open

      setTimeout(() => {
        dispatch(closeLoader());
      }, 500);

      // If we have an id in the params, see if there's a matching incident in the db/store
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
  }, [isMapLoaded, incidentList.length, id]);

  // Close the drawer if we're interacting with the map & the drawer is open d
  React.useEffect(() => {
    if (interactingWithMap) {
      if (drawerOpen) {
        dispatch(toggleDrawer(false));
      }

      if (selectedIncident) {
        dispatch(setSelectedIncident(undefined));
      }
    }
  }, [interactingWithMap]);

  React.useEffect(() => {
    if (userLocation.coordinates) {
      setCenter([
        userLocation.coordinates.longitude,
        userLocation.coordinates.latitude,
      ]);
    }
  }, [userLocation.coordinates]);

  React.useEffect(() => {
    // If the selected incident changes, zoom into it
    if (selectedIncident && mapRef) {
      mapRef.flyTo({
        center: [
          selectedIncident.coordinates.longitude,
          selectedIncident.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
        offset: [0, -150],
      });
    }
  }, [selectedIncident]);

  return (
    <SafeArea>
      <ReactMapGl
        ref={refForMap}
        mapboxAccessToken={Environment.config.MAPBOX_API_KEY}
        mapStyle={'mapbox://styles/drnt/cmi89nj7n004i01s4cshw1tn4'}
        attributionControl={false}
        initialViewState={{
          latitude: 43.653225,
          longitude: -79.383186,
          zoom: 11.0,
        }}
        maxBounds={[
          [-79.75, 43.55], // Southwest (includes a bit of Mississauga & Lake Ontario)
          [-79.0, 43.9], // Northeast (includes a bit of Pickering & Vaughan)
        ]}
        style={{ width: '100vw', height: '100vh' }}
        minZoom={9}
        //disables zooming while an incident is selected
        interactive={!selectedIncident}
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
          if (drawerOpen) {
            dispatch(toggleDrawer(false));
          }
        }}
      >
        <AttributionControl compact={true} position="bottom-left" />

        {/* Overlay button for opening the drawer */}
        {!drawerOpen && (
          <Button
            size="icon-lg"
            className={`absolute top-[20px] left-[20px] bg-background hover:bg-background/80`}
            onClick={() => {
              dispatch(toggleDrawer(true));
              if (selectedIncident) {
                dispatch(setSelectedIncident(undefined));
              }
            }}
          >
            <MenuIcon className="text-primary" />
          </Button>
        )}

        <MapIncidentInfo
          incident={selectedIncident}
          drawerOpen={drawerOpen}
          close={() => dispatch(setSelectedIncident(undefined))}
        />

        <MapCameraInfo
          camera={selectedCamera}
          drawerOpen={drawerOpen}
          close={() => dispatch(setSelectedCamera(undefined))}
        />

        <ButtonGroup
          className="absolute bottom-[25px] right-[25px]"
          hidden={Boolean(drawerOpen || selectedIncident)}
        >
          <Button
            size="icon-lg"
            onClick={() => dispatch(openModal('mobile-app-download'))}
            className="bg-background hover:bg-background/80"
          >
            <TabletSmartphoneIcon className="text-primary" />
          </Button>
          <ButtonGroupSeparator className="bg-accent" />
          {userLocation.available && (
            <>
              <Button
                size="icon-lg"
                className="bg-background hover:bg-background/80"
                onClick={() => dispatch(setRequestingLocationPermissions(true))}
              >
                <NavigationIcon className="text-primary" />
              </Button>
              <ButtonGroupSeparator className="bg-accent" />
            </>
          )}

          <Button
            size="icon-lg"
            onClick={() => dispatch(openModal('project-info'))}
            className="bg-background hover:bg-background/80"
          >
            <InfoIcon className="text-primary" />
          </Button>
        </ButtonGroup>

        {userLocation.coordinates && (
          <AnimatedMapMarker
            color={Colors.SECONDARY}
            coordinates={userLocation.coordinates}
            size={15}
          />
        )}

        {selectedIncident && (
          <AnimatedMapMarker
            color={Colors.PRIMARY}
            coordinates={selectedIncident?.coordinates}
            size={22}
          />
        )}

        {/* The incident features */}
        {incidentList
          .map(incident => {
            const selected = Boolean(
              selectedIncident && selectedIncident.id === incident.id
            );
            if (!selected) {
              return (
                <MapMarker
                  key={incident.id}
                  coordinates={incident.coordinates}
                  onClick={() => {
                    dispatch(setSelectedIncident(incident));
                  }}
                />
              );
            }

            return null;
          })
          .filter(incidentFeature => Boolean(incidentFeature))}
      </ReactMapGl>
      <MapSidebar
        isOpen={drawerOpen}
        onClose={() => dispatch(toggleDrawer(false))}
      />
      <Toaster />
    </SafeArea>
  );
};

export default Map;
