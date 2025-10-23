import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import { AppState } from '../../store';
import { closeModal } from '../../store/ui/actions';

import ProjectInfoModal from './ProjectInfo';

import DownloadMobileAppModal from './DownloadMobileApp';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

export type ModalTypes = 'project-info' | 'mobile-app-download';

export interface ModalProps {
  close: () => void;
}

const ModalTable: { [key in ModalTypes]?: any } = {
  'project-info': ProjectInfoModal,

  'mobile-app-download': DownloadMobileAppModal,
};

const Modal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  const [dismissModal] = useDebouncedCallback(() => {
    dispatch(closeModal());
  }, 200);

  const ModalFromType = open && type ? ModalTable[type] : null;

  return (
    <Dialog open={open} onOpenChange={open => !open && dismissModal()}>
      <DialogContent showCloseButton={true}>
        {/* The modal content aka DialogContent children */}
        {ModalFromType && <ModalFromType close={dismissModal} />}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
