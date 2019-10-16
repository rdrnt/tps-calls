import * as React from 'react';
import styled from 'styled-components';
import {
  Slider,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
  // @ts-ignore missing types
} from '@reach/slider';
import '@reach/slider/styles.css';

import { Colors, Sizes } from '../../../../config';
import Text, { DEFAULT_TEXT_STYLES } from '../../../Text';

export interface DistanceFilter {
  distance?: number;
  setDistance: (distance?: number) => void;
}

const Container = styled.div`
  height: auto;
  width: 100%;
  border-radius: 6px;
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 2}px;

  div.row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  div.distanceValue {
    text-align: center;
  }
`;

const DistanceFilter: React.FunctionComponent<DistanceFilter> = ({
  distance = 0,
  setDistance,
}) => {
  const [initialDistance, setInitialDistance] = React.useState<number>(
    distance
  );

  React.useEffect(() => {
    setDistance(initialDistance);
  }, [initialDistance]);

  return (
    <Container>
      <div className="row">
        <Text as="p" weight="bold">
          0
        </Text>
        <Slider
          min={0}
          max={15}
          defaultValue={0}
          name="distanceSlider"
          value={initialDistance}
          onChange={setInitialDistance}
        >
          <SliderTrack>
            <SliderTrackHighlight />
            <SliderHandle />
          </SliderTrack>
        </Slider>
        <Text as="p" weight="bold">
          15
        </Text>
      </div>
      <div className="distanceValue">
        <Text as="p" {...DEFAULT_TEXT_STYLES.h5}>
          {`${initialDistance}km`}
        </Text>
      </div>
    </Container>
  );
};

export default DistanceFilter;
