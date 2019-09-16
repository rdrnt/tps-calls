import styled, { css } from 'styled-components';

import { ValidTextTypes } from './';
import { Colors } from '../../config';

export interface StyledTextProps {
  color?: string;
  weight?: number | string;
  size?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

let DEFAULT_TEXT_STYLES: { [key in ValidTextTypes]: StyledTextProps } = {
  h1: {
    size: 80,
    weight: 300,
    letterSpacing: -1.5,
  },
  h2: {
    size: 40,
    weight: 'bold',
    letterSpacing: -1,
  },
  h3: {
    size: 36,
    weight: 300,
  },
  h4: {
    size: 24,
    weight: 'bold',
  },
  h5: {
    size: 16,
    weight: 'bold',
    lineHeight: 24,
  },
  h6: {
    size: 10,
    weight: 'normal',
    letterSpacing: 1,
    lineHeight: 16,
  },
  span: {
    size: 10,
    weight: 'normal',
    color: Colors.TEXT_SECONDARY,
  },
  p: {
    size: 16,
    weight: 'normal',
    lineHeight: 20,
  },
};

const createStyles = (props: StyledTextProps) => css<typeof props>`
  margin: 0;
  padding: 0;
  color: ${props.color ? props.color : Colors.TEXT_PRIMARY};
  font-size: ${props.size}px;
  font-weight: ${props.weight};
  ${props.letterSpacing && `letter-spacing: ${props.letterSpacing}px`};
  ${props.lineHeight && `line-height: ${props.lineHeight}px`};
`;

const H1 = styled.h1<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h1,
      ...props,
    })};
`;

const H2 = styled.h2<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h2,
      ...props,
    })};
`;

const H3 = styled.h3<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h3,
      ...props,
    })};
`;

const H4 = styled.h4<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h4,
      ...props,
    })};
`;

const H5 = styled.h5<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h5,
      ...props,
    })};
`;

const H6 = styled.h6<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.h6,
      ...props,
    })};
`;

const P = styled.p<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.p,
      ...props,
    })};
`;

const Span = styled.span<StyledTextProps>`
  ${props =>
    createStyles({
      ...DEFAULT_TEXT_STYLES.span,
      ...props,
    })};
`;

export { H1, H2, H3, H4, H5, H6, P, Span, DEFAULT_TEXT_STYLES };
