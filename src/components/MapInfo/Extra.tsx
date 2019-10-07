import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { darken } from 'polished';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Sizes, Colors } from '../../config';
import { createShareUrl } from '../../helpers';

import { Button } from '../Button';

import Text from '../Text';

const ExtraContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${Colors.BACKGROUND_SECONDARY};
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
  incidentId: string;
}

const ShareButton: React.FunctionComponent<{
  onCopy: () => void;
  id: string;
}> = ({ onCopy, id }) => {
  return (
    <CopyToClipboard text={createShareUrl(id)} onCopy={onCopy}>
      <Button label="share" color={darken(0.2, Colors.PRIMARY)} />
    </CopyToClipboard>
  );
};

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
            <ShareButton onCopy={showCopyMessage} id={incidentId} />
          </ShowHideContent>
        )}
      </PoseGroup>
    </ExtraContent>
  );
};

export default MapInfoExtraContent;
