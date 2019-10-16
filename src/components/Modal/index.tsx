import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { AppState } from '../../store';
import { closeModal } from '../../store/ui/actions';
import { Sizes } from '../../config';

import ProjectInfoModal from './ProjectInfo';

export type ModalTypes = 'basic' | 'project-info';

export interface ModalProps {
  onDismiss?: () => void;
}

const ModalTable: { [key in ModalTypes]?: React.ReactNode } = {
  basic: null,
  'project-info': <ProjectInfoModal />,
};

const Modal: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  if (open && type) {
    const ModalFromType = ModalTable[type];
    return (
      <Dialog
        onDismiss={() => dispatch(closeModal())}
        style={{ padding: Sizes.SPACING, borderRadius: 8, zIndex: 999 }}
      >
        {ModalFromType}
      </Dialog>
    );
  }

  return null;
};

export default Modal;
