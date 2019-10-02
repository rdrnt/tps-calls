import * as React from 'react';
import { FiSliders, FiSidebar, FiXCircle, FiX } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';

type IconNames = 'slider' | 'search' | 'menu' | 'x-circle' | 'x';

const AllIcons: { [key in IconNames]?: React.ReactElement } = {
  slider: <FiSliders />,
  search: <GoSearch />,
  menu: <FiSidebar />,
  'x-circle': <FiXCircle />,
  x: <FiX />,
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
