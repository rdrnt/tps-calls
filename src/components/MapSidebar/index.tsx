import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import MapSidebarItem from './parts/Item';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { Search, X } from 'lucide-react';
import { Incident } from '@rdrnt/tps-calls-shared';
import { setSelectedIncident, toggleDrawer } from '../../store/actions';

/**
 * Props interface for the MapSidebar component
 */
interface MapSidebarProps {
  /** Controls whether the sidebar is visible or hidden */
  isOpen: boolean;
  /** Callback function to close the sidebar */
  onClose: () => void;
  /** Optional content to render inside the sidebar */
  children?: React.ReactNode;
}

/**
 * MapSidebar Component
 *
 * A responsive sidebar component that:
 * - Takes full screen width on mobile devices
 * - Uses 400px width on larger screens
 * - Has a sticky header that stays visible when scrolling
 * - Includes smooth slide-in/out animations
 * - Provides a close button for mobile/tablet users
 */
const MapSidebar: React.FC<MapSidebarProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const dispatch = useAppDispatch();
  const incidents = useAppSelector(state => state.incidents.list);
  const filter = useAppSelector(state => state.incidents.filter);

  const onItemClick = (incident: Incident<any>) => {
    dispatch(toggleDrawer(false));
    dispatch(setSelectedIncident(incident));
  };

  return (
    <AnimatePresence mode="wait">
      {/* 
        Sidebar container with Framer Motion animations
        AnimatePresence handles enter/exit animations smoothly
      */}
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }} // Start off-screen to the left
          animate={{ x: 0 }} // Slide in to normal position
          exit={{ x: '-100%' }} // Slide out to the left when closing
          transition={{
            type: 'spring', // Use spring animation for natural feel
            stiffness: 300, // Controls spring tension
            damping: 30, // Controls spring damping (higher = less bouncy)
            mass: 0.8, // Controls spring mass (affects animation speed)
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
            - bg-white: Solid background to cover scrolling content
            - border-b border-gray-200: Subtle bottom border for visual separation
          */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Start slightly transparent and moved up
            animate={{ opacity: 1, y: 0 }} // Fade in and slide to position
            transition={{ delay: 0.1, duration: 0.1 }} // Slight delay for staggered effect
            className="sticky top-0 z-10 bg-white"
          >
            <div className="flex flex-row items-center justify-between p-4 pb-0">
              {/* 
                Header Title with slide-in animation
                - text-lg: Large text size
                - font-semibold: Medium font weight
                - text-gray-900: Dark gray color for good contrast
              */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.1 }}
                className="text-lg font-semibold text-gray-900"
              >
                Incidents
              </motion.h2>
              {/* 
                Close Button with scale animation on hover
                - lg:hidden: Hidden on large screens (desktop doesn't need close button)
                - p-2: Padding for touch-friendly target
                - rounded-md: Medium border radius
                - hover:bg-gray-100: Light gray background on hover
                - aria-label: Accessibility label for screen readers
              */}
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
                <InputGroupInput placeholder="Arrest, Yonge St, etc..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                {incidents.length > 0 && filter?.search && (
                  <InputGroupAddon align="inline-end">
                    12 results
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>
          </motion.div>

          {/* 
            Scrollable Content Area with staggered content animation
            - p-4: Padding on all sides
            - overflow-y-auto: Vertical scrolling when content exceeds height
            - h-[calc(100vh-73px)]: Height calculation to account for sticky header
              (73px is approximate header height including padding and border)
          */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="p-4 overflow-y-auto h-[calc(100vh-73px)]"
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
