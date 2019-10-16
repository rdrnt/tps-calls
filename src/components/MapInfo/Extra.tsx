import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { darken } from 'polished';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Sizes, Colors } from '../../config';
import { createShareUrl } from '../../helpers';

import { Button, IconButton } from '../Button';

import Text from '../Text';
import { IconNames } from '../Icon';

const ExtraContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${Colors.BACKGROUND_SECONDARY};
  height: 55px;
  width: 100%;
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
  incidentId: string;
}

const ActionContent = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
  incidentId,
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
          <ShowHideContent key="share-button">
            <ActionContent>
              <CopyToClipboard text={createShareUrl(incidentId)}>
                <ShareButton iconName="link" onClick={showCopyMessage} />
              </CopyToClipboard>
            </ActionContent>
          </ShowHideContent>
        )}
      </PoseGroup>
    </ExtraContent>
  );
};

export default MapInfoExtraContent;
