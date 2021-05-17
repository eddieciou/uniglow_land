import PropTypes from 'prop-types';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const CommonModal = ({
  title, description, handelCancel, handleSubmit, open, submitText, content, isLoading, submitDisabled,
}) => (
  <Dialog
    open={open}
  >
    <DialogTitle>{title}</DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
      </DialogContent>
      {content && (
      <DialogContent>
        {content(isLoading)}
      </DialogContent>
      )}
      <DialogActions>
        <Button disabled={isLoading} onClick={handelCancel} color="secondary">
          取消
        </Button>
        <Button
          disabled={isLoading || submitDisabled}
          type="submit"
          style={{ color: `${isLoading || submitDisabled ? '' : '#35a728'}` }}
        >
          {submitText}
          {isLoading && <CircularProgress size={15} />}
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

CommonModal.propTypes = {
  description: PropTypes.string,
  handelCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  content: PropTypes.func,
  submitDisabled: PropTypes.bool,
};

CommonModal.defaultProps = {
  description: undefined,
  submitText: '確定',
  title: '',
  isLoading: false,
  content: undefined,
  submitDisabled: false,
};

export default CommonModal;
