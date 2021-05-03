import PropTypes from 'prop-types';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio as MRadio } from '@material-ui/core';

const Radio = ({
  title, value, onChange, choices,
}) => (
  <FormControl component="fieldset">
    { title && <FormLabel component="legend">{title}</FormLabel>}
    <RadioGroup value={value.toString()} onChange={onChange} row>
      {
          choices.map(
            (part) => (
              <FormControlLabel
                key={part.value}
                value={part.value.toString()}
                control={<MRadio />}
                label={part.title}
              />
            ),
          )
        }
    </RadioGroup>
  </FormControl>
);

Radio.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Radio.defaultProps = {
  title: undefined,
};

export default Radio;
