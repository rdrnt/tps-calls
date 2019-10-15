import * as React from 'react';
import {
  FiSliders,
  FiSidebar,
  FiX,
  FiCalendar,
  FiArrowRight,
} from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { IoIosAlert, IoMdLocate } from 'react-icons/io';

export type IconNames =
  | 'slider'
  | 'search'
  | 'menu'
  | 'x'
  | 'calendar'
  | 'right-arrow'
  | 'info'
  | 'position';

const AllIcons: { [key in IconNames]?: React.ReactElement } = {
  slider: <FiSliders />,
  search: <GoSearch />,
  menu: <FiSidebar />,
  x: <FiX />,
  calendar: <FiCalendar />,
  'right-arrow': <FiArrowRight />,
  info: <IoIosAlert />,
  position: <IoMdLocate />,
};

export interface IconProps {
  name: IconNames;
  color?: string;
  size?: number;
}

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  color = 'black',
  size = 50,
  children,
}) => {
  const IconForName = AllIcons[name];
  if (IconForName) {
    return React.cloneElement(
      IconForName,
      {
        color,
        size,
      },
      children
    );
  }
  return null;
};

export default Icon;
