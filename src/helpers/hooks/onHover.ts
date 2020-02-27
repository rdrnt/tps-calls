import * as React from 'react';

interface OnHoverReturnProps {
  onMouseOver: () => void;
  onMouseOut: () => void;
  onTouchEnd: () => void;
  onTouchStart: () => void;
}

export const onHover = (): [boolean, OnHoverReturnProps] => {
  // const [hovering, setHovering] = React.useState<boolean>(false);

  const hovering = true;

  const setHovering = (val: boolean) => {};

  const returnValues: OnHoverReturnProps = {
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false),
    onTouchEnd: () => setHovering(false),
    onTouchStart: () => setHovering(true),
  };

  return [hovering, returnValues];
};
