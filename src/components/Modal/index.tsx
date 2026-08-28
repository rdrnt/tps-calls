import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import { AppState } from '../../store';
import { closeModal } from '../../store/actions';

import { Dialog, DialogContent } from '../ui/dialog';
import { ModalTypes, ModalProps } from './types';

const ProjectInfoModal = React.lazy(() => import('./ProjectInfo'));
const DownloadMobileAppModal = React.lazy(() => import('./MobileApp'));
const IncidentFiltersModal = React.lazy(() => import('./IncidentFilters'));

type LazyModalComponent = React.LazyExoticComponent<
  React.FunctionComponent<ModalProps>
>;

// Modal bodies stay deferred until the user opens a specific modal type.
const ModalTable: { [key in ModalTypes]?: LazyModalComponent } = {
  'project-info': ProjectInfoModal,
  'incident-filters': IncidentFiltersModal,
  'mobile-app-download': DownloadMobileAppModal,
};

const Modal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  const dismissModal = useDebouncedCallback(() => {
    dispatch(closeModal());
  }, 200);

  const ModalFromType = open && type ? ModalTable[type] : null;

  return (
    <Dialog open={open} onOpenChange={open => !open && dismissModal()}>
      <DialogContent showCloseButton={true}>
        {ModalFromType && (
          <React.Suspense fallback={null}>
            <ModalFromType close={dismissModal} />
          </React.Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
