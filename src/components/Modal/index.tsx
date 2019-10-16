import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@reach/dialog';
import { useDebouncedCallback } from 'use-debounce';
import '@reach/dialog/styles.css';

import { AppState } from '../../store';
import { closeModal } from '../../store/ui/actions';
import { Sizes } from '../../config';

import ProjectInfoModal from './ProjectInfo';

export type ModalTypes = 'project-info';

export interface ModalProps {
  close: () => void;
}

const ModalTable: { [key in ModalTypes]?: any } = {
  'project-info': ProjectInfoModal,
};

const Modal: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  const [dismissModal] = useDebouncedCallback(() => {
    dispatch(closeModal());
  }, 200);

  if (open && type) {
    const ModalFromType = ModalTable[type];

    return (
      <Dialog
        onDismiss={dismissModal}
        style={{
          padding: Sizes.SPACING,
          borderRadius: 8,
          zIndex: 999,
          minWidth: '50vw',
          maxWidth: '80vw',
          width: 'auto',
        }}
      >
        <ModalFromType close={dismissModal} />
      </Dialog>
    );
  }

  return null;
};

export default Modal;
