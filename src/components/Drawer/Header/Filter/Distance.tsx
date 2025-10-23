import * as React from 'react';
import styled from 'styled-components';
import {
  Slider,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
  // @ts-ignore missing types
} from '@reach/slider';
import { AppState, useAppDispatch, useAppSelector } from '../../../../store';

import { Colors, Sizes } from '../../../../config';
import Text, { DEFAULT_TEXT_STYLES } from '../../../Text';
import { setRequestingLocationPermissions } from '../../../../store/actions';

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

const EnableButton = styled.button`
  height: 20px;
  width: 50px;
  background-color: ${Colors.BACKGROUND};
  border: none;
`;

const DistanceFilter: React.FunctionComponent<DistanceFilter> = ({
  distance = 0,
  setDistance,
}) => {
  const { available, coordinates } = useAppSelector(
    (state: AppState) => state.user.location
  );
  const dispatch = useAppDispatch();

  const [initialDistance, setInitialDistance] =
    React.useState<number>(distance);

  React.useEffect(() => {
    setDistance(initialDistance);
  }, [initialDistance]);

  return (
    <Container>
      {available && coordinates ? (
        <>
          <div className="row">
            <Text as="p" weight="bold">
              0
            </Text>
            <Slider
              handleAlignment="center"
              min={0}
              max={15}
              defaultValue={0}
              name="distanceSlider"
              value={initialDistance}
              // onChange={setInitialDistance}
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
        </>
      ) : (
        <div className="distanceValue">
          <Text as="span" size={11} secondaryFont={true}>
            Location services must be enabled.
          </Text>
          <EnableButton
            type="button"
            onClick={() => dispatch(setRequestingLocationPermissions(true))}
          >
            <Text
              as="span"
              secondaryFont={true}
              color={Colors.PRIMARY}
              size={11}
            >
              enable
            </Text>
          </EnableButton>
        </div>
      )}
    </Container>
  );
};

export default DistanceFilter;
