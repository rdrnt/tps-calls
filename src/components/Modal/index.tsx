import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@reach/dialog';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';

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

const StyledDialog = styled(Dialog)`
  padding: ${Sizes.SPACING}px;
  border-radius: 8px;
  z-index: 999;
  min-width: 50vw;
  /* If the screen is under 600px */
  @media only screen and (max-width: 600px) {
    min-width: 85vw;
  }
  width: auto;
`;

const Modal: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { open, type } = useSelector((appState: AppState) => appState.ui.modal);

  const [dismissModal] = useDebouncedCallback(() => {
    dispatch(closeModal());
  }, 200);

  if (open && type) {
    const ModalFromType = ModalTable[type];

    return (
      <StyledDialog onDismiss={dismissModal}>
        <ModalFromType close={dismissModal} />
      </StyledDialog>
    );
  }

  return null;
};

export default Modal;
