import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../Text';
import { IconButton } from '../Button';
import { Colors, Sizes } from '../../config';
import Icon from '../Icon';
import { ModalProps } from '.';

import { Analytics } from '../../helpers';

type ProjectInfoModal = ModalProps;

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

const ExternalLink = styled.a.attrs({ target: '_blank', rel: 'noopener' })`
  ${createTextStyles({ ...DEFAULT_TEXT_STYLES.p })};
`;

const ProjectInfoModal: React.FunctionComponent<ProjectInfoModal> = ({
  close,
}) => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_PROJECT_INFO,
    });
  }, []);

  return (
    <Container>
      <Heading>
        <Text as="h2">tpscalls</Text>
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
        title="Why am I seeing nothing new?"
        content={
          <>
            <Text as="p">{`Once in a while the Toronto Police's data feed goes offline. Unfortunately this is out of my control. If you have any questions, feel free to contact me.`}</Text>
          </>
        }
      />
      <InfoRow
        title="Contact"
        content={
          <>
            <ExternalLink href="/contact">Contact Page</ExternalLink>
            <ExternalLink href="mailto:riley@drnt.ca">Email Me</ExternalLink>
          </>
        }
      />
      <InfoRow
        title="Bug report & feedback"
        content={
          <>
            <Text as="p">{`I really appreciate feedback and any help towards improving the project. If you would like to get in touch, you can find places to contact me below.`}</Text>
            <ExternalLink href="/contact">Contact Page</ExternalLink>
          </>
        }
      />
      <InfoRow
        title="API & Open Source"
        content={
          <div className="extras">
            <Text as="p">{`Tpscalls is proudly open source and now offers a REST API anyone can use! Explore the codebase and find more information on how to get started with the API at the links below.`}</Text>
            <ExternalLink
              href="https://github.com/rdrnt/tps-calls"
              style={{ marginTop: 5 }}
            >
              Source Code
            </ExternalLink>
            <ExternalLink href="https://github.com/rdrnt/tps-calls/blob/master/API.md">
              API docs
            </ExternalLink>
          </div>
        }
      />
      <InfoRow
        title="Donate"
        content={
          <>
            <Text as="p">{`Your donations are greatly appreciated! They help cover server costs and keep my coffee cup full.`}</Text>
            <ExternalLink
              href="https://ko-fi.com/drnt_"
              style={{ marginTop: 5 }}
            >
              Donate on Ko-fi
            </ExternalLink>
          </>
        }
      />
    </Container>
  );
};

export default ProjectInfoModal;
