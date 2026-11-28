import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../store';
import { closeModal } from '../../store/actions';
import { lazyWithReload } from '../../helpers/lazyWithReload';

import { Dialog, DialogContent } from '../ui/dialog';
import { Sheet, SheetContent } from '../ui/sheet';
import useIsMobile from '../../hooks/useIsMobile';
import { ModalTypes, ModalProps } from './types';

const ProjectInfoModal = lazyWithReload(() => import('./ProjectInfo'));
const DownloadMobileAppModal = lazyWithReload(() => import('./MobileApp'));
const IncidentFiltersModal = lazyWithReload(() => import('./IncidentFilters'));

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

  const dismissModal = React.useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const { isMobile } = useIsMobile();

  const ModalFromType = type ? ModalTable[type] : null;
  const body = ModalFromType && (
    <React.Suspense fallback={null}>
      <ModalFromType close={dismissModal} />
    </React.Suspense>
  );

  // Phones get a bottom sheet, like the incident panel; larger screens get a centred dialog.
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={open => !open && dismissModal()}>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] overflow-y-auto rounded-t-xl p-6 pb-[calc(1.5rem_+_var(--safe-bottom))]"
        >
          {body}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={open => !open && dismissModal()}>
      <DialogContent showCloseButton={true}>{body}</DialogContent>
    </Dialog>
  );
};

export default Modal;
