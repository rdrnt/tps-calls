import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@reach/dialog';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { AppState } from '../../store';
import { closeModal } from '../../store/ui/actions';
import { Sizes } from '../../config';

import ProjectInfoModal from './ProjectInfo';

import AndroidBetaSignupModal from './AndroidBetaSignup';
import DownloadMobileAppModal from './DownloadMobileApp';

export type ModalTypes =
  | 'project-info'
  | 'addMissingPerson'
  | 'android-beta-signup'
  | 'mobile-app-download';

export interface ModalProps {
  close: () => void;
}

const ModalTable: { [key in ModalTypes]?: any } = {
  'project-info': ProjectInfoModal,

  'android-beta-signup': AndroidBetaSignupModal,
  'mobile-app-download': DownloadMobileAppModal,
};

const StyledDialog = styled(Dialog)`
  padding: ${Sizes.SPACING}px;
  border-radius: 8px;
  z-index: 999;
  min-width: 60vw;
  /* If the screen is under 600px */
  @media only screen and (max-width: 600px) {
    min-width: 85vw;
  }
`;

const Modal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  const [dismissModal] = useDebouncedCallback(() => {
    dispatch(closeModal());
  }, 200);

  const ModalFromType = open && type ? ModalTable[type] : null;

  return (
    <AnimatePresence>
      {ModalFromType && (
        <StyledDialog onDismiss={dismissModal}>
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalFromType close={dismissModal} />
          </motion.div>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
