import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../config';

export enum TextType {
  H1 = 'h1',
  H3 = 'h3',
  P = 'p',
  CAPTION = 'caption',
}

interface StyledText {
  color?: string;
  textAlign?: string;
  bold?: boolean;
}

export interface Text extends StyledText {
  type: TextType;
}

/*
  color: ${(props: any) => props.color ? props.color : Colors.PRIMARY};
  text-align: ${(props: any) => props.textAlign ? props.textAlign : 'left'};
  font-weight: ${(props: any) => props.bold ? 'bold' : 'normal'};
*/

const H1 = styled.h1<StyledText>`
  font-size: 62px;
  font-weight: normal;
  text-align: ${(props: any) => (props.textAlign ? props.textAlign : 'left')};
  color: ${(props: any) => (props.color ? props.color : Colors.TEXT_PRIMARY)};
  font-weight: ${(props: any) => (props.bold ? 'bold' : 'normal')};
`;

const H3 = styled.h3<StyledText>`
  font-size: 20px;
  font-weight: 500;
  text-align: ${(props: any) => (props.textAlign ? props.textAlign : 'left')};
  color: ${(props: any) => (props.color ? props.color : Colors.TEXT_PRIMARY)};
`;

const P = styled.p<StyledText>`
  font-size: 12px;
  font-weight: normal;
  text-align: ${(props: any) => (props.textAlign ? props.textAlign : 'left')};
  color: ${(props: any) => (props.color ? props.color : Colors.TEXT_SECONDARY)};
`;

const Text: React.FunctionComponent<Text> = ({ children, type, ...rest }) => {
  switch (type) {
    case TextType.H1:
      return <H1 {...rest}>{children}</H1>;
    case TextType.H3:
      return <H3 {...rest}>{children}</H3>;
    case TextType.P:
      return <P {...rest}>{children}</P>;
    default:
      return null;
  }
};

export default Text;
