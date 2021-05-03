import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const Selector = ({
  value, selectors, width, onChange, style, disableItemCondition, disabled, selectKey, displayEmpty,
}) => {
  const classes = userStyles({ width });
  const outlinedInputClasses = useOutlinedInputStyles();

  return (
    <FormControl
      disabled={disabled}
      size="small"
      variant="outlined"
      className={classes.root}
    >
      <Select
        displayEmpty={displayEmpty}
        style={{ ...style }}
        value={value}
        onChange={onChange}
        input={(<OutlinedInput classes={outlinedInputClasses} />)}
      >
        {
          displayEmpty
          && (
          <MenuItem disabled value="">
            請選擇
          </MenuItem>
          )
        }
        {
          selectors.map((part) => (
            <MenuItem
              disabled={disableItemCondition(part[selectKey])}
              key={part[selectKey]}
              value={part[selectKey]}
            >
              {part.title}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

const userStyles = makeStyles({
  root: {
    width: (props) => props.width,
    textAlign: 'center',
  },
});

const useOutlinedInputStyles = makeStyles(() => ({
  input: {
    padding: '6px',
  },
  root: {
    backgroundColor: 'white',
    '& $notchedOutline': {
      borderRadius: 2,
    },
  },
  focused: {},
  notchedOutline: {},
}));

Selector.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string.isRequired,
    },
  )).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  disableItemCondition: PropTypes.func,
  disabled: PropTypes.bool,
  selectKey: PropTypes.string,
  displayEmpty: PropTypes.bool,
};

Selector.defaultProps = {
  width: undefined,
  style: undefined,
  disableItemCondition: () => false,
  disabled: false,
  selectKey: 'value',
  displayEmpty: false,
};

export default Selector;
