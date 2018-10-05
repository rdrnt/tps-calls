import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import Icon from './Icon';

const AnimationContainer = posed.div({
  pulse: {
    'box-shadow': '0px 0px 0px 0px rgba(64,84,178, 0.6)',
    transition: () => ({
      type: 'keyframes',
      values: [
        '0px 0px 0px 0px rgba(64,84,178, 0.8)',
        '0px 0px 0px 10px rgba(64,84,178, 0.0)',
        '0px 0px 0px 0px rgba(64,84,178, 0.0)',
      ],
      duration: 1500,
      loop: Infinity,
    }),
  },
});

const AnimatedDot = ({ animating }) => (
  <AnimationContainer
    style={{
      height: 24,
      width: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(64,84,178, 1)',
    }}
    initialPose="none"
    pose={animating ? 'pulse' : ''}
  >
    <Icon name="Dot" color="primary" />
  </AnimationContainer>
);

AnimatedDot.propTypes = {
  animating: PropTypes.bool,
};

AnimatedDot.defaultProps = {
  animating: false,
};

export default AnimatedDot;
