import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

import NetworkErrorModal, {
  NetworkErrorModalActions,
} from './Modal/NetworkErrorModal';
import ProjectInfoModal, {
  ProjectInfoModalActions,
} from './Modal/ProjectInfoModal';

const modalReferenceTable = {
  networkError: {
    modal: NetworkErrorModal,
    actions: NetworkErrorModalActions,
  },
  projectInfo: {
    modal: ProjectInfoModal,
    actions: ProjectInfoModalActions,
  },
};

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    overflowY: 'auto',
    height: '100%',
    borderRadius: '4px',
  },
  modalRoot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    maxHeight: '70%',
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      maxHeight: '70%',
      minHeight: '40%',
    },
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ModalManager = props => {
  const { open, type, classes } = props;

  // TODO: Better accesibility
  if (type.length !== 0) {
    // Get the Modal from the reference table
    const InnerModalComponent = modalReferenceTable[type].modal;
    const InnerModalActionComponent = modalReferenceTable[type].actions;
    return (
      <Modal
        aria-labelledby="Modal"
        aria-describedby="Afocused box presenting info you cur"
        disableAutoFocus
        open={open}
      >
        <div className={classes.modalRoot}>
          <div className={classes.paper}>
            <InnerModalComponent />
          </div>
          {InnerModalActionComponent && <InnerModalActionComponent />}
        </div>
      </Modal>
    );
  }

  // return null if we don't have a type or modal for the provided type
  return null;
};

ModalManager.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
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

const ConnectedModalManager = connect(mapStateToProps)(ModalManager);

export default withStyles(styles)(ConnectedModalManager);
