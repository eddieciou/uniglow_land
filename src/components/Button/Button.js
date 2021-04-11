import PropTypes from 'prop-types';
import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Button = ({ title, onClick }) => {
  const classes = useStyles();
  return (
    <MaterialButton
      variant="contained"
      disableElevation
      className={classes.root}
      onClick={onClick}
    >
      {title}
    </MaterialButton>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#878686',
    borderRadius: 2,
    maxHeight: '31px',
    width: 120,
  },
}));

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
