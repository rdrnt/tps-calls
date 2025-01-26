import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Incident } from '@rdrnt/tps-calls-shared';

import { DateHelper } from '../../helpers';
import { Sizes, Colors } from '../../config';
import Text from '../Text';
import { IconButton } from '../Button';

import MapInfoExtraContent from './Extra';

const WIDTH = 335;

const Container = styled(motion.div)`
  position: absolute;
  bottom: ${Sizes.SPACING * 3}px;
  left: calc(50% - ${WIDTH / 2}px);
  width: ${WIDTH}px;
  height: auto;
  min-height: 50px;
  background-color: ${Colors.BACKGROUND};
  border-radius: 8px;
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    margin: 0 ${Sizes.SPACING / 2}px;
    padding: ${Sizes.SPACING / 2}px 0;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const IncidentContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* Incident info */
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    > h4,
    p {
      margin-bottom: ${Sizes.SPACING / 4}px;
    }
  }

  > button {
    margin-left: 5px;
    min-width: 17px;
  }
`;

interface MapIncidentInfo {
  incident?: Incident<any>;
  drawerOpen: boolean;
  close: () => void;
}

const MapIncidentInfo: React.FunctionComponent<MapIncidentInfo> = ({
  incident,
  drawerOpen,
  close,
}) => {
  return (
    <AnimatePresence>
      {incident && !drawerOpen && (
        <Container key="info" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Content>
            <IncidentContent>
              <div>
                <Text as="h4" size={22} weight="500" lineHeight={22}>
                  {incident.name}
                </Text>
                <Text as="p" lineHeight={21}>
                  {incident.location}
                </Text>
                <Text as="span" size={12}>
                  {DateHelper.formatIncidentDate(incident.date)}
                </Text>
              </div>
              <IconButton
                size={17}
                backgroundColor={Colors.TEXT_SECONDARY}
                borderRadius={8.5}
                iconProps={{ size: 13, name: 'x', color: 'white' }}
                onClick={close}
              />
            </IncidentContent>
            <MapInfoExtraContent incident={incident} close={close} />
          </Content>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default MapIncidentInfo;
