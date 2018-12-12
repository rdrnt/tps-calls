import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ModalActions, { AlignmentType } from './ModalActions';

import { ModalLocale } from '../../locale';

import store from '../../store';
import { uiActions } from '../../actions';

const NetworkErrorModal = () => (
  <>
    <Typography gutterBottom variant="h4" id="modal-title" color="primary">
      {ModalLocale.networkError.title}
      <Typography variant="subtitle1" id="modal-description">
        {ModalLocale.networkError.description}
      </Typography>
    </Typography>
  </>
);

export const NetworkErrorModalActions = () => (
  <ModalActions alignment={AlignmentType.center}>
    <Button
      size="small"
      onClick={() => store.dispatch(uiActions.toggleModal(false, ''))}
      color="primary"
      style={{ backgroundColor: 'white', marginRight: 20 }}
    >
      Close
    </Button>
    <Button
      size="small"
      onClick={() => window.open('mailto:contact@rileyyy.com', '_blank')}
      color="primary"
      style={{ backgroundColor: 'white', marginLeft: 20 }}
    >
      Email
    </Button>
  </ModalActions>
);
export default NetworkErrorModal;
