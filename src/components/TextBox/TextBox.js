import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const TextBox = ({ children, disabled }) => {
  const classes = userStyles({ disabled });

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

const userStyles = makeStyles({
  root: {
    color: (props) => props.disabled && '#bab9b9',
    fontSize: 20,
    width: '70%',
    margin: '10px 0 10px 0',
    border: 'solid',
    borderWidth: '1px',
    borderRadius: 3,
    borderColor: (props) => props.disabled && '#bab9b9',
  },
});

export default TextBox;
