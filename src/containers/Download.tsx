import * as React from 'react';
import styled from 'styled-components';

import Text from '../components/Text';
import { Button } from '../components/Button';
import { Colors, Sizes } from '../config';
import { Analytics } from '../helpers';

import AppStoreDownloadImage from '../assets/images/appStoreDownload.svg';
import PlayStoreDownloadImage from '../assets/images/googlePlayDownload.svg';
import AppLogo from '../assets/images/appStoreIcon.jpg';

const APPSTORE_DOWNLOAD_LINK =
  'https://apps.apple.com/us/app/tpscalls/id6502376708';

const PLAYSTORE_DOWNLOAD_LINK =
  'https://play.google.com/store/apps/details?id=com.drnt.tpscalls';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${Colors.BACKGROUND};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    margin-top: ${Sizes.SPACING}px;
    color: ${Colors.BACKGROUND};
  }
`;

const StyledHeadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    height: 250px;
    width: 250px;
    border-radius: 25px;
  }

  > h2 {
  }

  > h6 {
  }

  > p {
    color: ${Colors.TEXT_SECONDARY};
    font-weight: 300;
    letter-spacing: 1px;
    padding: ${Sizes.SPACING}px;
    max-width: 60%;

    @media only screen and (max-width: 600px) {
      max-width: 100%;
      padding: ${Sizes.SPACING}px;
    }
  }
`;

const StyledDownloadButtonContent = styled.div`
  display: flex;
  flex-dirction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${Sizes.SPACING}px;
  padding-top: 0;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 200px;
  }

  .spacer {
    background-color: transparent;
    height: auto;
    width: ${Sizes.SPACING * 4}px;
  }

  @media only screen and (max-width: 600px) {
    img {
      width: 175px;
    }

    .spacer {
      background-color: transparent;
      height: ${Sizes.SPACING}px;
      width: ${Sizes.SPACING}px;
    }
  }
`;

const StyledDividerContent = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 ${Sizes.SPACING * 2}px;

  .divider {
    height: 2px;
    width: 100%;
    background-color: ${Colors.BORDER};
  }

  > p {
    margin: 0 20px;
    color: ${Colors.BORDER};
  }
`;

const StyledBottomDownloadContent = styled.div`
  padding: ${Sizes.SPACING}px;

  > a {
    > button {
      padding: ${Sizes.SPACING}px;
      color: ${Colors.BACKGROUND};
      font-weight: 500;
    }
  }
`;

const DownloadPage = () => {
  React.useEffect(() => {
    Analytics.pageview('/download');
  }, []);

  return (
    <Container>
      <StyledHeadingContent>
        <img src={AppLogo} />
        <Text as="h2">tpscalls</Text>
        <Text as="h6">By Riley Durant</Text>

        <Text as="p">
          tpscalls is now available on mobile devices, bringing you a real-time
          map of Toronto Police response locations. Track incidents like
          arrests, gun calls, and collisions right from your phone. Stay
          informed with instant updates, wherever you are.
        </Text>
      </StyledHeadingContent>

      <StyledDownloadButtonContent>
        <a href={APPSTORE_DOWNLOAD_LINK} target="_blank" rel="noopener">
          <img src={AppStoreDownloadImage} />
        </a>
        <div className="spacer" />
        <a href={PLAYSTORE_DOWNLOAD_LINK} target="_blank" rel="noopener">
          <img src={PlayStoreDownloadImage} />
        </a>
      </StyledDownloadButtonContent>
      <StyledDividerContent>
        <div className="divider" />
        <Text as="p">OR</Text>
        <div className="divider" />
      </StyledDividerContent>
      <StyledBottomDownloadContent>
        <a href="/">
          <Button>VIEW ON THE WEB</Button>
        </a>
      </StyledBottomDownloadContent>
    </Container>
  );
};

export default DownloadPage;
