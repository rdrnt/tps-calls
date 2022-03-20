import * as React from 'react';

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Span,
  StyledTextProps,
  createTextStyles,
  DEFAULT_TEXT_STYLES,
} from './text.styles';

export type ValidTextTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p';

const getTextComponentForType = (type: ValidTextTypes) => {
  switch (type) {
    case 'h1':
      return <H1 />;
    case 'h2':
      return <H2 />;
    case 'h3':
      return <H3 />;
    case 'h4':
      return <H4 />;
    case 'h5':
      return <H5 />;
    case 'h6':
      return <H6 />;
    case 'p':
      return <P />;
    case 'span':
      return <Span />;
    default:
      return <P />;
  }
};

const Text: React.FunctionComponent<{
  as: ValidTextTypes;
} & StyledTextProps> = ({ as, children, ...rest }) => {
  const TextComponent = getTextComponentForType(as);

  return React.cloneElement(TextComponent, { ...rest }, children);
};

export { createTextStyles, DEFAULT_TEXT_STYLES };

export default Text;
