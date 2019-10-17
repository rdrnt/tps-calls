import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Incident } from '@rdrnt/tps-calls-shared';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Sizes, Colors } from '../../config';
import { URL } from '../../helpers';

import { Button, IconButton } from '../Button';

import Text from '../Text';
import { IconNames } from '../Icon';

const ExtraContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${Colors.BORDER};
  height: 55px;
`;

const ShowHideContent = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

interface MapInfoExtraContent {
  incident: Incident<any>;
}

const ActionContent = styled(ShowHideContent)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  > * {
    :not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const ShareButton: React.FunctionComponent<{
  iconName: IconNames;
  onClick?: () => void;
}> = ({ iconName, onClick }) => (
  <IconButton
    size={30}
    backgroundColor={Colors.PRIMARY}
    borderRadius={15}
    iconProps={{ size: 15, name: iconName, color: 'white' }}
    onClick={onClick}
  />
);

const MapInfoExtraContent: React.FunctionComponent<MapInfoExtraContent> = ({
  incident,
}) => {
  const [showingCopyMessage, toggleCopyMessage] = React.useState<boolean>(
    false
  );

  const showCopyMessage = () => {
    toggleCopyMessage(true);
    setTimeout(() => {
      toggleCopyMessage(false);
    }, 1200);
  };
  return (
    <ExtraContent>
      <PoseGroup>
        {showingCopyMessage ? (
          <ShowHideContent key="share-text">
            <Text as="span">Copied to clipboard</Text>
          </ShowHideContent>
        ) : (
          <ActionContent key="actions">
            {/* Copy link */}
            <CopyToClipboard text={URL.createShareUrl(incident.id)}>
              <ShareButton iconName="link" onClick={showCopyMessage} />
            </CopyToClipboard>
            {/* Twitter button */}
            <a
              className="twitter-share-button"
              href={URL.createTwitterShareUrl(incident.id)}
            >
              <ShareButton iconName="twitter" />
            </a>
          </ActionContent>
        )}
      </PoseGroup>
    </ExtraContent>
  );
};

export default MapInfoExtraContent;
