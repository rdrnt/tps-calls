import * as React from 'react';
import {
  FiSliders,
  FiX,
  FiCalendar,
  FiArrowRight,
  FiMenu,
  FiChevronRight,
  FiChevronDown,
  FiLink,
} from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import {
  IoMdInformationCircle,
  IoMdLocate,
  IoLogoTwitter,
  IoMdAlert,
} from 'react-icons/io';
import { MdPersonSearch, MdInstallMobile } from 'react-icons/md';

export type IconNames =
  | 'alert'
  | 'slider'
  | 'search'
  | 'menu'
  | 'mobile-install'
  | 'x'
  | 'calendar'
  | 'right-arrow'
  | 'info'
  | 'personSearch'
  | 'position'
  | 'chevron-right'
  | 'chevron-down'
  | 'link'
  | 'twitter';

const AllIcons: { [key in IconNames]?: React.ReactElement } = {
  alert: <IoMdAlert />,
  slider: <FiSliders />,
  search: <GoSearch />,
  menu: <FiMenu />,
  'mobile-install': <MdInstallMobile />,
  x: <FiX />,
  calendar: <FiCalendar />,
  'right-arrow': <FiArrowRight />,
  info: <IoMdInformationCircle />,
  position: <IoMdLocate />,
  'chevron-down': <FiChevronDown />,
  'chevron-right': <FiChevronRight />,
  link: <FiLink />,
  twitter: <IoLogoTwitter />,
  personSearch: <MdPersonSearch />,
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
