import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import { Incident } from '@rdrnt/tps-calls-shared';
// v8 requires the renderer-specific /mapbox entry point for Mapbox GL v3.
import ReactMapGl, { AttributionControl, MapRef } from 'react-map-gl/mapbox';
import { useParams } from 'react-router';
import {
  MenuIcon,
  NavigationIcon,
  InfoIcon,
  TabletSmartphoneIcon,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

import { MAPBOX_THEME_URL, Colors } from '../config';
import { buildIncidentTitle, MAP_METADATA } from '@/config/seo';
import usePageMetadata from '@/hooks/usePageMetadata';
import * as Environment from '../helpers/environment';
import * as Analytics from '../helpers/analytics';
import * as FirebaseIncidents from '../helpers/firebase/incident';

import { useAppDispatch, useAppSelector } from '../store';
import { useReduxIncidents } from '../store/selectors';

import {
  LocationListener,
  IncidentListener,
  CameraListener,
} from '../components/Listeners';

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

const Map: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  const incidentList = useReduxIncidents();
  const selectedIncident = useAppSelector(state => state.incidents.selected);
  const incidentsListReady = useAppSelector(state => state.incidents.listReady);
  const { drawerOpen, loader } = useAppSelector(state => state.ui);
  const userLocation = useAppSelector(state => state.user.location);

  const selectedCamera = useAppSelector(state => state.cameras.selected);

  const refForMap = React.useRef<MapRef | null>(null);

  const [isMapLoaded, setIsMapLoaded] = React.useState<boolean>(false);
  const [interactingWithMap, setInteractingWithMap] =
    React.useState<boolean>(false);

  const pageTitle = selectedIncident
    ? buildIncidentTitle(selectedIncident.name, selectedIncident.location)
    : MAP_METADATA.title;
  const pageDescription = selectedIncident
    ? selectedIncident.location.trim()
      ? `${selectedIncident.name} at ${selectedIncident.location}. Live Toronto Police call on tpscalls.`
      : `${selectedIncident.name}. Live Toronto Police call on tpscalls.`
    : MAP_METADATA.description;
  const canonicalPath = id ? `/${id}` : MAP_METADATA.canonicalPath;

  usePageMetadata({
    title: pageTitle,
    description: pageDescription,
    canonicalPath,
  });

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
    if (!isMapLoaded && !loader.open) {
      dispatch(openLoader('Loading map...'));
      Analytics.pageview('/map');
    }

    // Wait for the first Firestore snapshot, not a non-empty list, before revealing the map.
    if (isMapLoaded && incidentsListReady && loader.open) {
      dispatch(closeLoader());
    }
  }, [isMapLoaded, incidentsListReady, loader.open, dispatch]);

  React.useEffect(() => {
    if (!isMapLoaded || !id) {
      return;
    }

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
  }, [isMapLoaded, id, incidentList.length]);

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
    const map = refForMap.current;
    if (userLocation.coordinates && map) {
      map.flyTo({
        center: [
          userLocation.coordinates.longitude,
          userLocation.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [userLocation.available, userLocation.coordinates]);

  React.useEffect(() => {
    // If the selected incident changes, zoom into it
    const map = refForMap.current;
    if (selectedIncident && map) {
      map.flyTo({
        center: [
          selectedIncident.coordinates.longitude,
          selectedIncident.coordinates.latitude,
        ],
        speed: 1,
        zoom: 15,
      });
    }
  }, [selectedIncident]);

  return (
    <>
      <IncidentListener />
      <CameraListener />
      <LocationListener />
      <h1 className="sr-only">Live Toronto Police Calls Map</h1>
      <ReactMapGl
        ref={refForMap}
        mapboxAccessToken={Environment.config.MAPBOX_API_KEY}
        mapStyle={MAPBOX_THEME_URL}
        attributionControl={false}
        trackResize={true}
        initialViewState={{
          latitude: 43.653225,
          longitude: -79.383186,
          zoom: 11.0,
        }}
        maxBounds={[
          [-79.75, 43.55], // Southwest (includes a bit of Mississauga & Lake Ontario)
          [-79.0, 43.9], // Northeast (includes a bit of Pickering & Vaughan)
        ]}
        style={{
          width: '100vw',
          height: '100vh',
        }}
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

        <SafeArea className="h-dvh pb-safe-bottom">
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
            mapRef={refForMap}
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
                  onClick={() =>
                    dispatch(setRequestingLocationPermissions(true))
                  }
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
        </SafeArea>

        {userLocation.coordinates && (
          <AnimatedMapMarker
            color="secondary"
            coordinates={userLocation.coordinates}
            size={15}
          />
        )}

        {selectedIncident && (
          <AnimatedMapMarker
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
    </>
  );
};

export default Map;
