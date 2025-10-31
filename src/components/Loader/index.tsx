import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

import BounceLoader from 'react-spinners/BounceLoader';

import { useAppDispatch, useAppSelector } from '../../store';

import { Colors } from '../../config';

import { closeLoader } from '../../store/slices/ui';
import { Typography } from '../Typography';

const Loader: React.FunctionComponent = () => {
  const { open, message } = useAppSelector(state => state.ui.loader);
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="loader"
          className="absolute top-0 left-0 h-full w-full z-[999] bg-background flex flex-col justify-center items-center"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationEnd={() => {
            dispatch(closeLoader());
          }}
        >
          <BounceLoader color={Colors.PRIMARY} />
          {message && (
            <Typography
              variant="h2"
              align="center"
              className="max-sm:text-[43px] mt-4 text-primary"
            >
              {message}
            </Typography>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
