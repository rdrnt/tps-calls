import * as React from 'react';
import { FiSliders } from 'react-icons/fi';

type IconNames = 'slider';

const AllIcons: { [key in IconNames]?: React.ReactElement } = {
  slider: <FiSliders />,
};

interface IconProps {
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
    return React.cloneElement(IconForName, { color, size }, children);
  }
  return null;
};

export default Icon;
