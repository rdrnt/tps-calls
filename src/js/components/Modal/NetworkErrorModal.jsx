import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ModalActions, { AlignmentType } from './ModalActions';

import { ModalLocale } from '../../locale';

import store from '../../store';
import { uiActions } from '../../actions';

const NetworkErrorModal = () => (
  <>
    <Typography gutterBottom variant="h6" id="modal-title">
      {ModalLocale.networkError.title}
    </Typography>
    <Typography variant="subtitle1" id="modal-description">
      {ModalLocale.networkError.description}
    </Typography>
    <ModalActions alignment={AlignmentType.right}>
      <Button
        size="small"
        onClick={() => store.dispatch(uiActions.toggleModal(false, ''))}
      >
        Close
      </Button>
    </ModalActions>
  </>
);

export default NetworkErrorModal;
