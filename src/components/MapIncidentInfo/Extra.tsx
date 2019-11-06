import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Incident } from '@rdrnt/tps-calls-shared';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Colors } from '../../config';
import { URL, Analytics } from '../../helpers';

import { IconButton } from '../Button';

import { IconNames } from '../Icon';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/ui/actions';

const ExtraContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${Colors.BORDER};
  height: 55px;
`;

interface MapInfoExtraContent {
  incident: Incident<any>;
  close: () => void;
}

const ActionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

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
  close,
}) => {
  const dispatch = useDispatch();
  return (
    <ExtraContent>
      <ActionContent>
        {/* Copy link */}
        <CopyToClipboard text={URL.createShareUrl(incident.id)}>
          <ShareButton
            iconName="link"
            onClick={() => {
              dispatch(
                showToast({
                  message: 'Copied to clipboard',
                  options: {
                    intent: 'success',
                    icon: 'link',
                  },
                })
              );
              Analytics.event({
                category: 'UI',
                action: Analytics.UI.SHARE_INCIDENT_URL,
              });
            }}
          />
        </CopyToClipboard>
        {/* Twitter button */}
        <a
          className="twitter-share-button"
          href={URL.createTwitterShareUrl(incident)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ShareButton
            iconName="twitter"
            onClick={() => {
              Analytics.event({
                category: 'UI',
                action: Analytics.UI.SHARE_INCIDENT_TWITTER,
              });
            }}
          />
        </a>
      </ActionContent>
    </ExtraContent>
  );
};

export default MapInfoExtraContent;
