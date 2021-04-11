import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const BookMarkBar = ({
  content, picked, onChange, InputProps,
}) => {
  const classes = userStyles({ picked });

  return (
    <div className={classes.root}>
      {
        content.map(
          (part, index) => (
            <Button
              key={part.value}
              onClick={() => { onChange(part.value); }}
              className={classes.button}
              style={{
                borderTopLeftRadius: !index && 0,
                backgroundColor: part.value === picked ? 'white' : '',
                borderBottomWidth: part.value === !picked && '1px',
              }}
            >
              {part.title}
            </Button>
          ),
        )
      }
      <div className={classes.mock} />
      {
        InputProps.endAdornment && <div className={classes.endAdornment}>{InputProps.endAdornment}</div>
      }
    </div>
  );
};

const userStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: 'white',
  },
  button: {
    border: '1px solid #bab9b9',
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    width: '10%',
    backgroundColor: '#f1f1f1',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  mock: {
    flex: 1,
    borderBottom: '1px solid #bab9b9',
  },
  endAdornment: {
    float: 'right',
    borderBottom: '1px solid #bab9b9',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
});

BookMarkBar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  picked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
  }),
};

BookMarkBar.defaultProps = {
  InputProps: {},
};

export default BookMarkBar;
