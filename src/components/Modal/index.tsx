import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@reach/dialog';

import { AppState } from '../../store';

export type ModalTypes = 'basic' | 'project-info';

export interface ModalProps {
  onDismiss?: () => void;
}

const ModalTable: { [key in ModalTypes]?: React.ReactNode } = {
  basic: null,
  'project-info': null,
};

const Modal: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  if (open && type) {
    const ModalFromType = ModalTable[type];
    return <Dialog isOpen={true}>{ModalFromType}</Dialog>;
  }

  return null;
};

export default Modal;
