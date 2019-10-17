import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../Text';
import { IconButton } from '../Button';
import { Colors, Sizes } from '../../config';
import Icon from '../Icon';
import { ModalProps } from '.';

interface ProjectInfoModal extends ModalProps {}

const InfoRowContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${Colors.BORDER};
  background-color: ${Colors.BACKGROUND};
`;

const InfoRowHeading = styled.button`
  width: 100%;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: inherit;
  padding: ${Sizes.SPACING / 3}px 0;
`;

const InfoRowInnerContent = styled(
  posed.div({
    open: {
      height: 'auto',
    },
    closed: {
      height: 0,
    },
  })
)`
  width: 100%;
  background-color: inherit;
  overflow: hidden;
  padding: ${props => (props.pose === 'open' ? Sizes.SPACING / 2 : 0)}px;
  padding-top: 0;
`;

const InfoRow: React.FunctionComponent<{
  title: string;
  content: React.ReactElement;
}> = ({ title, content }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <InfoRowContainer>
      <InfoRowHeading onClick={() => setOpen(!open)}>
        <Icon size={25} name={open ? 'chevron-down' : 'chevron-right'} />
        <Text as="h5">{title}</Text>
      </InfoRowHeading>
      <InfoRowInnerContent pose={open ? 'open' : 'closed'}>
        {content}
      </InfoRowInnerContent>
    </InfoRowContainer>
  );
};

const Container = styled.div`
  .extras {
    a:not(:last-child) {
      margin-bottom: ${Sizes.SPACING / 3}px;
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.BORDER};
  padding: ${Sizes.SPACING / 3}px 0;
`;

const ExternalLink = styled.a`
  ${createTextStyles({ ...DEFAULT_TEXT_STYLES.p })};
`;

const ProjectInfoModal: React.FunctionComponent<ProjectInfoModal> = ({
  close,
}) => {
  return (
    <Container>
      <Heading>
        <Text as="h2">tpscalls (beta 2.0)</Text>
        <IconButton
          size={40}
          iconProps={{ size: 25, name: 'x' }}
          onClick={close}
        />
      </Heading>
      <InfoRow
        title="What is this?"
        content={
          <>
            <Text as="p">{`tpscalls.live is a real-time map of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests, gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.`}</Text>
          </>
        }
      />
      <InfoRow
        title="Bug report & feedback"
        content={
          <>
            <Text as="p">{`I really appreciate feedback and help towards improving the site. If you would like to get in contact, you can find places to reach me below.`}</Text>
          </>
        }
      />
      <InfoRow
        title="Extras"
        content={
          <div className="extras">
            <ExternalLink href="mailto:contact@rileyyy.com">Email</ExternalLink>
            <ExternalLink href="https://github.com/rdrnt/tps-calls">
              Source code & Release notes
            </ExternalLink>
            <ExternalLink href="https://c4s.torontopolice.on.ca">
              Inspiration
            </ExternalLink>
          </div>
        }
      />
    </Container>
  );
};

export default ProjectInfoModal;
