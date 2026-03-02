import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDebouncedCallback } from 'use-debounce';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { Button } from '../ui/button';
import MapSidebarItem from './parts/Item';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectFilteredIncidents } from '../../store/selectors';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';

import {
  setSelectedIncident,
  toggleDrawer,
  setIncidentFilter,
  openModal,
} from '../../store/actions';
import { LocalIncident } from '../../types';

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
  const incidents = useAppSelector(selectFilteredIncidents);
  const filter = useAppSelector(state => state.incidents.filter);

  // Local state for search input (updates immediately, prevents lag)
  const [localSearchInputValue, setLocalSearchInputValue] = useState(
    filter?.search || ''
  );

  // Sync local search input with Redux when filter changes externally
  useEffect(() => {
    setLocalSearchInputValue(filter?.search || '');
  }, [filter?.search]);

  // Debounced function to update Redux search filter
  const [debouncedUpdateReduxSearch] = useDebouncedCallback(
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

  const onItemClick = (incident: LocalIncident) => {
    dispatch(toggleDrawer(false));
    dispatch(setSelectedIncident(incident));
  };

  return (
    <AnimatePresence mode="wait">
      {/* 
        Sidebar container with Framer Motion animations
     
      */}
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }} // Start off-screen to the left
          animate={{ x: 0 }} // Slide in to normal position
          exit={{ x: '-100%' }} // Slide out to the left when closing
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className={`
          /* Positioning and Layout */
          fixed top-0 left-0 h-full 
          /* Responsive Width: Full width on mobile, 384px on small screens, 400px on medium+ */
          w-full sm:w-96 md:w-[400px] 
          /* Visual Styling */
          bg-background shadow-xl z-50
          /* Desktop Override: Always visible on large screens */
          lg:translate-x-0
        `}
        >
          {/* 
            Sticky Header Container with subtle fade-in animation
            - sticky top-0: Sticks to the top of the viewport when scrolling
            - z-10: Ensures header stays above content
          */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Start slightly transparent and moved up
            animate={{ opacity: 1, y: 0 }} // Fade in and slide to position
            transition={{ delay: 0.1, duration: 0.1 }} // Slight delay for staggered effect
            className="sticky top-0 z-10"
          >
            <div className="flex flex-row items-center justify-between p-4 pb-0">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.1 }}
                className="text-lg font-semibold text-foreground"
              >
                Incidents
              </motion.h2>

              <Button
                variant="ghost"
                size="icon-lg"
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
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

                {incidents.length > 0 && filter?.search && (
                  <InputGroupAddon align="inline-end">
                    {incidents.length} results
                  </InputGroupAddon>
                )}
                <InputGroupButton
                  onClick={() => {
                    dispatch(openModal('incident-filters'));
                  }}
                  variant="ghost"
                  size="icon-sm"
                >
                  <SlidersHorizontal />
                </InputGroupButton>
              </InputGroup>
            </div>
          </motion.div>

          {/* 
            Scrollable Content Area with staggered content animation
            - h-[calc(100vh-73px)]: Height calculation to account for sticky header
              (73px is approximate header height including padding and border)
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="p-4 overflow-y-auto h-[calc(100dvh-73px)]"
          >
            {children || (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.1 }}
                className="text-gray-500 text-center pb-10"
              >
                {incidents.map(incident => (
                  <MapSidebarItem
                    key={incident.id}
                    incident={incident}
                    onClick={() => onItemClick(incident)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapSidebar;
