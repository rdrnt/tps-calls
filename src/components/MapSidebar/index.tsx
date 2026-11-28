import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useDebouncedCallback } from 'use-debounce';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import MapSidebarItem from './parts/Item';
import { useAppDispatch, useAppSelector } from '../../store';
import { useReduxIncidents } from '../../store/selectors';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';

import {
  toggleDrawer,
  setIncidentFilter,
  openModal,
} from '../../store/actions';
import useSelectIncident from '../../hooks/useSelectIncident';
import { LocalIncident } from '../../types';
import { DATE_RANGE_LIMIT } from '../../store/slices/incidents';

// Rows stagger in (capped so long lists don't trickle) and fade out when filtered away.
const ROW_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -8, transition: { duration: 0.12 } },
  shown: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, delay: Math.min(index, 12) * 0.025 },
  }),
};

interface MapSidebarProps {
  isOpen: boolean;

  onClose: () => void;

  children?: React.ReactNode;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const dispatch = useAppDispatch();
  const selectIncident = useSelectIncident();
  const incidents = useReduxIncidents();
  const filter = useAppSelector(state => state.incidents.filter);
  const capped = useAppSelector(state => state.incidents.capped);
  const filtersActive = Boolean(filter?.distance || filter?.dateRange);

  // Sync local search input with Redux when filter changes externally (e.g. reset filters).
  const externalSearch = filter?.search || '';
  const [localSearchInputValue, setLocalSearchInputValue] =
    useState(externalSearch);
  const [syncedExternalSearch, setSyncedExternalSearch] =
    useState(externalSearch);

  if (externalSearch !== syncedExternalSearch) {
    setSyncedExternalSearch(externalSearch);
    setLocalSearchInputValue(externalSearch);
  }

  // Debounced function to update Redux search filter
  const debouncedUpdateReduxSearch = useDebouncedCallback(
    (searchValue: string) => {
      dispatch(
        setIncidentFilter({
          values: { search: searchValue.trim() || undefined },
        })
      );
    },
    300
  );

  // Update local state immediately, debounce Redux update
  const handleLocalSearchInputChange = (newValue: string) => {
    setLocalSearchInputValue(newValue); // local: immediate
    debouncedUpdateReduxSearch(newValue); // redux: debounced
  };

  // Escape closes the sidebar, unless a popup on top of it is taking the key.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (document.querySelector('[role="dialog"]')) return;
      onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const onItemClick = (incident: LocalIncident) => {
    dispatch(toggleDrawer(false));
    selectIncident(incident);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className="bg-background fixed top-0 left-0 z-50 flex h-full w-full flex-col shadow-xl sm:w-96 md:w-[400px]"
        >
          <div className="shrink-0">
            <div className="flex flex-row items-center justify-between p-4 pb-0">
              <h2 className="text-lg font-semibold text-foreground">
                Incidents
              </h2>

              <Button
                variant="ghost"
                size="icon-lg"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X />
              </Button>
            </div>
            <div className="p-4">
              <InputGroup>
                <InputGroupInput
                  placeholder="Arrest, Yonge St, etc..."
                  value={localSearchInputValue}
                  onChange={event =>
                    handleLocalSearchInputChange(event.target.value)
                  }
                />
                <InputGroupAddon>
                  {localSearchInputValue ? (
                    <InputGroupButton
                      onClick={() => handleLocalSearchInputChange('')}
                      variant="ghost"
                      size="icon-sm"
                    >
                      <X />
                    </InputGroupButton>
                  ) : (
                    <Search />
                  )}
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">
                  {(filter?.search || filtersActive) && (
                    <span className="tabular-nums">
                      {incidents.length}{' '}
                      {incidents.length === 1 ? 'result' : 'results'}
                    </span>
                  )}
                  <InputGroupButton
                    onClick={() => {
                      dispatch(openModal('incident-filters'));
                    }}
                    variant="ghost"
                    size="icon-sm"
                    aria-label={filtersActive ? 'Filters (on)' : 'Filters'}
                    className={cn(
                      'relative',
                      filtersActive && 'text-tpscalls-primary'
                    )}
                  >
                    <SlidersHorizontal />
                    {filtersActive && (
                      <span className="bg-tpscalls-primary absolute top-1 right-1 size-1.5 rounded-full" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {children || (
              <div className="relative pb-10 text-center">
                {capped && filter?.dateRange && (
                  <p className="text-muted-foreground pb-3 text-xs">
                    Showing the newest {DATE_RANGE_LIMIT} incidents in this date
                    range. Narrow the range to see the rest.
                  </p>
                )}
                {incidents.length === 0 &&
                  (filter?.search || filtersActive) && (
                    <p className="text-muted-foreground py-10 text-sm">
                      No incidents match your search or filters.
                    </p>
                  )}
                <AnimatePresence mode="popLayout">
                  {incidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      layout="position"
                      custom={index}
                      variants={ROW_VARIANTS}
                      initial="hidden"
                      animate="shown"
                      exit="hidden"
                    >
                      <MapSidebarItem
                        incident={incident}
                        onClick={() => onItemClick(incident)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapSidebar;
