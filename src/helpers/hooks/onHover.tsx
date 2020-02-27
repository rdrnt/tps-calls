import * as React from 'react';

interface OnHoverReturnProps {
  onMouseOver: () => void;
  onMouseOut: () => void;
  onTouchEnd: () => void;
  onTouchStart: () => void;
}

const OnHover = (): [boolean, OnHoverReturnProps] => {
  const [hovering, setHovering] = React.useState<boolean>(false);

  const returnValues: OnHoverReturnProps = {
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false),
    onTouchEnd: () => setHovering(false),
    onTouchStart: () => setHovering(true),
  };

  return [hovering, returnValues];
};

export { OnHover as onHover };
