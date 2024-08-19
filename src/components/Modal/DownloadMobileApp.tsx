import * as React from 'react';
import styled from 'styled-components';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../Text';
import { Button, IconButton } from '../Button';
import { Colors, Sizes } from '../../config';
import { ModalProps } from '.';

import { Analytics } from '../../helpers';
import Icon from '../Icon';

type ProjectInfoModal = ModalProps;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: left;

  padding: ${Sizes.SPACING / 3}px 0;
  margin-top: ${Sizes.SPACING / 2}px;

  p {
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  p:not(:last-child) {
    margin-bottom: ${Sizes.SPACING}px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button:not(:last-child) {
    margin-right: ${Sizes.SPACING}px;
  }
`;

const StyledLearnMoreButton = styled.a`
  border-radius: 5px;
  background-color: ${Colors.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: ${Sizes.SPACING / 2}px ${Sizes.SPACING}px;
  color: ${Colors.BACKGROUND};

  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1px;
  text-decoration: none;

  svg {
    margin-left: ${Sizes.SPACING / 3}px;
  }

  &:hover {
    background-color: ${Colors.TEXT_PRIMARY};
  }
`;

const DownloadMobileAppModal: React.FunctionComponent<ProjectInfoModal> = ({
  close,
}) => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_DOWNLOAD_APP_MODAL,
    });
  }, []);

  return (
    <Container>
      <Heading>
        <Text as="h2">Mobile App Release</Text>
        <IconButton
          size={40}
          iconProps={{ size: 25, name: 'x' }}
          onClick={close}
        />
      </Heading>
      <Content>
        <Text as="p">
          I'm thrilled to announce the launch of the tpscalls.live mobile app!
        </Text>
        <Text as="p">
          Now, you can access real-time police response locations across Toronto
          wherever you go. Download the app today to stay informed on the move,
          wherever you are in the city.
        </Text>
        <Text as="p">
          Thank you for your continued support of tpscalls. Stay tuned for more
          awesome updates!
        </Text>
        <ButtonContent>
          <StyledLearnMoreButton href="/download">
            Get The App
            <Icon name="right-arrow" size={13} color={Colors.BACKGROUND} />
          </StyledLearnMoreButton>
        </ButtonContent>
      </Content>
    </Container>
  );
};

export default DownloadMobileAppModal;
