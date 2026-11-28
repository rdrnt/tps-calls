import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
// v8 requires the renderer-specific /mapbox entry point for Mapbox GL v3.
import ReactMapGl, { AttributionControl, MapRef } from 'react-map-gl/mapbox';
import { Navigate, useNavigate, useParams } from 'react-router';
import {
  MenuIcon,
  LoaderCircleIcon,
  NavigationIcon,
  CircleQuestionMarkIcon,
  MoonIcon,
  SunIcon,
  TabletSmartphoneIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { MAPBOX_THEME_URL } from '../config';
import { buildIncidentTitle, MAP_METADATA } from '@/config/seo';
import usePageMetadata from '@/hooks/usePageMetadata';
import { cn } from '@/lib/utils';
import * as Environment from '../helpers/environment';
import * as Analytics from '../helpers/analytics';
import * as FirebaseIncidents from '../helpers/firebase/incident';
import { isMapSupported } from '../helpers/mapSupport';
import useIsMobile from '../hooks/useIsMobile';
import useSelectIncident from '../hooks/useSelectIncident';

import { useAppDispatch, useAppSelector, useAppStore } from '../store';
import { useReduxIncidents } from '../store/selectors';

import { LocationListener, IncidentListener } from '../components/Listeners';

import MapIncidentInfo from '../components/MapIncidentInfo';
import AnimatedMapMarker from '../components/MapMarker/Animated';
import MapMarker from '../components/MapMarker';
import MapButton from '../components/MapButton';
import { TooltipProvider } from '../components/ui/tooltip';
import { Toaster } from '../components/ui/sonner';
import { useTheme } from '../theme-provider';
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

import MapSidebar from '../components/MapSidebar';
import { SafeArea } from '../components/SafeArea';

const INITIAL_ZOOM = 11;

const Map: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const navigate = useNavigate();
  const selectIncident = useSelectIncident();
  const { id } = useParams<{ id?: string }>();

  const incidentList = useReduxIncidents();
  const selectedIncident = useAppSelector(state => state.incidents.selected);
  const incidentsListReady = useAppSelector(state => state.incidents.listReady);
  const { drawerOpen, loader } = useAppSelector(state => state.ui);
  const userLocation = useAppSelector(state => state.user.location);
  const { isMobile } = useIsMobile();
  const { resolvedTheme, toggleTheme } = useTheme();
  const lightPreset = resolvedTheme === 'dark' ? 'night' : 'day';

  const refForMap = React.useRef<MapRef | null>(null);

  const [isMapLoaded, setIsMapLoaded] = React.useState<boolean>(false);
  const [interactingWithMap, setInteractingWithMap] =
    React.useState<boolean>(false);

  const revealed = isMapLoaded && incidentsListReady;
  const buttonsHidden = Boolean(drawerOpen || selectedIncident);
  const hasRevealed = React.useRef(false);

  // Lazy initializer so the WebGL2 probe runs once per mount, not per render.
  // Support can't change mid-session, so re-checking is pure waste.
  const [mapSupported] = React.useState(isMapSupported);

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

  // Scrolling past the map's top overhang makes iOS Safari draw the map under its bars.
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const bleed = parseFloat(
      getComputedStyle(root).getPropertyValue('--map-bleed')
    );
    // The keyboard, focus and resizes can move the page; put it back unless a field is being edited.
    const restore = () => {
      if (document.activeElement?.matches('input, textarea')) return;
      if (window.scrollY !== bleed) window.scrollTo(0, bleed);
    };

    root.classList.add('map-route');
    restore();
    window.addEventListener('scroll', restore);
    window.addEventListener('resize', restore);
    window.visualViewport?.addEventListener('resize', restore);
    document.addEventListener('focusout', restore);
    return () => {
      window.removeEventListener('scroll', restore);
      window.removeEventListener('resize', restore);
      window.visualViewport?.removeEventListener('resize', restore);
      document.removeEventListener('focusout', restore);
      root.classList.remove('map-route');
      window.scrollTo(0, 0);
    };
  }, []);

  React.useEffect(() => {
    // The loader is global; leaving it open on the way out would cover /unsupported.
    if (!mapSupported) {
      if (loader.open) {
        dispatch(closeLoader());
      }
      return;
    }

    if (!isMapLoaded && !loader.open) {
      dispatch(openLoader('Loading map...'));
      Analytics.pageview('/map');
    }

    // Wait for the first Firestore snapshot, not a non-empty list, before revealing the map.
    if (isMapLoaded && incidentsListReady && loader.open) {
      dispatch(closeLoader());
    }
  }, [mapSupported, isMapLoaded, incidentsListReady, loader.open, dispatch]);

  // The style is Mapbox Standard, so one map switches between day and night.
  React.useEffect(() => {
    if (!isMapLoaded) return;
    refForMap.current
      ?.getMap()
      .setConfigProperty('basemap', 'lightPreset', lightPreset);
  }, [isMapLoaded, lightPreset]);

  // Settle into the city as the loader fades, unless a shared incident is about to fly in.
  React.useEffect(() => {
    if (!revealed || hasRevealed.current) return;
    hasRevealed.current = true;
    if (!id) {
      refForMap.current?.easeTo({
        zoom: INITIAL_ZOOM,
        duration: 1400,
        easing: t => 1 - Math.pow(1 - t, 3),
      });
    }
  }, [revealed, id]);

  // The URL decides which incident is open, so shared links and back/forward stay in step.
  React.useEffect(() => {
    if (!isMapLoaded || !incidentsListReady) return;

    const { list, selected } = store.getState().incidents;
    if (!id) {
      if (selected) dispatch(setSelectedIncident(undefined));
      return;
    }
    if (selected?.id === id) return;

    const fromList = list.find(incident => incident.id === id);
    if (fromList) {
      dispatch(setSelectedIncident(fromList));
      return;
    }

    let cancelled = false;
    FirebaseIncidents.getIncidentFromId(id).then(incident => {
      if (cancelled) return;
      if (incident) {
        dispatch(setSelectedIncident(incident));
      } else {
        toast.error('Incident no longer exists', {
          description: 'The incident you are looking for no longer exists.',
          position: 'top-center',
        });
        navigate('/', { replace: true });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id, isMapLoaded, incidentsListReady, store, dispatch, navigate]);

  // Dragging the map closes the drawer and the open incident.
  React.useEffect(() => {
    if (!interactingWithMap) return;
    if (drawerOpen) dispatch(toggleDrawer(false));
    if (selectedIncident) selectIncident(undefined);
  }, [
    interactingWithMap,
    drawerOpen,
    selectedIncident,
    dispatch,
    selectIncident,
  ]);

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

  // Every hook above must run first — bailing earlier would violate the rules of hooks.
  // `replace` so the back button doesn't bounce the user into the same dead map.
  if (!mapSupported) {
    return <Navigate to="/unsupported" replace />;
  }

  return (
    <TooltipProvider>
      <IncidentListener />
      <LocationListener />
      <h1 className="sr-only">Live Toronto Police Calls Map</h1>
      <ReactMapGl
        ref={refForMap}
        mapboxAccessToken={Environment.config.MAPBOX_API_KEY}
        mapStyle={MAPBOX_THEME_URL}
        // Sets the preset before the first frame, so light mode doesn't flash dark.
        config={{ basemap: { lightPreset } }}
        attributionControl={false}
        trackResize={true}
        initialViewState={{
          latitude: 43.653225,
          longitude: -79.383186,
          zoom: INITIAL_ZOOM - 0.4,
        }}
        maxBounds={[
          [-79.75, 43.5], // Southwest (includes a bit of Mississauga, and enough Lake Ontario that the map's overhang doesn't push downtown off-centre)
          [-79.0, 43.9], // Northeast (includes a bit of Pickering & Vaughan)
        ]}
        style={{
          width: '100vw',
          height: 'var(--map-height)',
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
        {/* Phones get Mapbox's ⓘ button; wider screens show the text so it isn't mistaken for About. */}
        <AttributionControl
          key={String(isMobile)}
          compact={isMobile}
          position="bottom-left"
        />

        <SafeArea className="h-dvh pb-safe-bottom">
          {/* Stays mounted so it can fade out; inert while the drawer covers it. */}
          <MapButton
            label="Incidents"
            tooltipSide="right"
            inert={drawerOpen}
            className={cn(
              'absolute top-[calc(var(--map-bleed)_+_20px)] left-[20px] duration-200 ease-out lg:top-[calc(var(--map-bleed)_+_24px)] lg:left-[24px]',
              drawerOpen && '-translate-x-3 opacity-0'
            )}
            onClick={() => {
              dispatch(toggleDrawer(true));
              if (selectedIncident) selectIncident(undefined);
            }}
          >
            <MenuIcon />
          </MapButton>

          <MapIncidentInfo
            incident={selectedIncident}
            drawerOpen={drawerOpen}
            close={() => selectIncident(undefined)}
            mapRef={refForMap}
          />

          <ButtonGroup
            inert={buttonsHidden}
            className={cn(
              'absolute right-[20px] bottom-[calc(var(--map-inset-bottom)_+_20px)] transition-[opacity,translate] duration-200 ease-out lg:right-[24px] lg:bottom-[calc(var(--map-inset-bottom)_+_24px)]',
              buttonsHidden && 'translate-y-3 opacity-0'
            )}
          >
            <MapButton
              label="Get the app"
              onClick={() => dispatch(openModal('mobile-app-download'))}
            >
              <TabletSmartphoneIcon />
            </MapButton>
            <ButtonGroupSeparator className="bg-accent" />
            {userLocation.available && (
              <>
                <MapButton
                  label="Show my location"
                  aria-busy={userLocation.requesting}
                  onClick={() =>
                    dispatch(setRequestingLocationPermissions(true))
                  }
                >
                  {userLocation.requesting ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <NavigationIcon />
                  )}
                </MapButton>
                <ButtonGroupSeparator className="bg-accent" />
              </>
            )}

            <MapButton
              label={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
              onClick={toggleTheme}
            >
              {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </MapButton>
            <ButtonGroupSeparator className="bg-accent" />
            <MapButton
              label="About"
              onClick={() => dispatch(openModal('project-info'))}
            >
              <CircleQuestionMarkIcon />
            </MapButton>
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
            coordinates={selectedIncident.coordinates}
            size={30}
            className="border-4 shadow-[0_2px_6px_rgb(0_0_0/0.45)]"
          />
        )}

        {/* Pins wait for the reveal, then stagger in newest first as the loader fades. */}
        {revealed &&
          incidentList.map((incident, index) => (
            <MapMarker
              key={incident.id}
              coordinates={incident.coordinates}
              delay={150 + Math.min(index * 8, 400)}
              hidden={incident.id === selectedIncident?.id}
              onClick={() => selectIncident(incident)}
            />
          ))}
      </ReactMapGl>

      <MapSidebar
        isOpen={drawerOpen}
        onClose={() => dispatch(toggleDrawer(false))}
      />
      <Toaster />
    </TooltipProvider>
  );
};

export default Map;
