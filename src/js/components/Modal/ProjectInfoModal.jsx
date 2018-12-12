import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ModalActions, { AlignmentType } from './ModalActions';

import { ModalLocale } from '../../locale';

import store from '../../store';
import { uiActions } from '../../actions';

const styles = theme => ({
  link: {
    'text-decoration': 'none',
    '&:hover': {
      'text-decoration': 'underline',
    },
  },
});

const ProjectInfoModal = ({ classes }) => (
  <>
    <Typography gutterBottom variant="h4" id="modal-title" color="primary">
      {ModalLocale.projectInfo.title}
    </Typography>
    {ModalLocale.projectInfo.body.map(bodyItem => (
      <>
        <Typography variant="h6">{bodyItem.heading}</Typography>
        {bodyItem.description ? (
          <Typography variant="subtitle1" gutterBottom paragraph>
            {bodyItem.description}
          </Typography>
        ) : (
          <>
            {bodyItem.links.map(bodyItemLink => (
              <Typography
                variant="subtitle1"
                component="a"
                href={bodyItemLink.url}
                gutterBottom
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
                key={bodyItemLink.title}
              >
                {bodyItemLink.title}
              </Typography>
            ))}
          </>
        )}
      </>
    ))}
  </>
);

export const ProjectInfoModalActions = () => (
  <ModalActions alignment={AlignmentType.center}>
    <Button
      size="small"
      onClick={() => store.dispatch(uiActions.toggleModal(false, ''))}
      color="primary"
      style={{ backgroundColor: 'white' }}
    >
      Close
    </Button>
  </ModalActions>
);

export default withStyles(styles)(ProjectInfoModal);
