import * as React from 'react';
import styled from 'styled-components';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../Text';
import { Button, IconButton } from '../Button';
import { Colors, Sizes } from '../../config';
import { ModalProps } from '.';

import { Analytics } from '../../helpers';

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

  padding: ${Sizes.SPACING / 3}px 0;
  margin-top: ${Sizes.SPACING / 2}px;

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

const AndroidBetaSignupModal: React.FunctionComponent<ProjectInfoModal> = ({
  close,
}) => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_ANDROID_BETA_MODAL,
    });
  }, []);

  const onSignupPressed = () => {
    const to = 'riley@drnt.ca';
    const subject = 'tpscalls Android beta registration';
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}`;

    window.open(mailtoLink);
  };

  return (
    <Container>
      <Heading>
        <Text as="h2">Hi Android User!</Text>
        <IconButton
          size={40}
          iconProps={{ size: 25, name: 'x' }}
          onClick={close}
        />
      </Heading>
      <Content>
        <Text as="p">
          I'm looking for 20 people to beta test the upcoming <b>tpscalls</b>{' '}
          Android app!
        </Text>
        <Text as="p">
          If you’re interested to be among the first to experience and shape the
          future of the app, click the button below to send me an email to get
          started.
        </Text>
        <Text as="p">
          As always, thank you for using tpscalls. Your support is greatly
          appreciated!
        </Text>
        <ButtonContent>
          <Button label="Sign Up" onClick={onSignupPressed} />
          <Button
            label="Dismiss"
            color={Colors.TEXT_SECONDARY}
            onClick={close}
          />
        </ButtonContent>
      </Content>
    </Container>
  );
};

export default AndroidBetaSignupModal;
