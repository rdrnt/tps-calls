import * as React from 'react';
import styled from 'styled-components';
import { AppState } from '../../store';
import { connect } from 'react-redux';

const Container = styled.div<TemplateProps>`
  transition: margin-left 0.5s;
  margin-left: ${props => (props.drawerOpen ? 250 : 0)}px;
`;

interface TemplateProps {
  drawerOpen: boolean;
}
const Template: React.FunctionComponent<TemplateProps> = ({
  children,
  drawerOpen,
}) => <Container drawerOpen={drawerOpen}>{children}</Container>;

const mapStateToProps = (state: AppState) => ({
  drawerOpen: state.ui.drawerOpen,
});

export default connect(
  mapStateToProps,
  null
)(Template);
