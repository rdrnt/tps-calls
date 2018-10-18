import React from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

import NetworkErrorModal from './Modal/NetworkErrorModal';

const modalReferenceTable = {
  networkError: NetworkErrorModal,
};

const ModalManager = props => {
  const { open, type } = props;

  // Get the inner Modal from the reference table
  const InnerModalComponent = modalReferenceTable[type];

  // If we have a type, or have InnerModalComponent, show the modal
  if (type.length !== 0 || InnerModalComponent) {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <InnerModalComponent />
      </Modal>
    );
  }

  // return null if we don't have a type or modal for the provided type
  return null;
};

ModalManager.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
};

ModalManager.defaultProps = {
  open: false,
  type: '',
};

function mapStateToProps(state) {
  return {
    ...state.UI.modal,
  };
}

export default connect(mapStateToProps)(ModalManager);
