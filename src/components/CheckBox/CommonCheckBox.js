import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GridItem from '../Grid/GridItem';

const CommonCheckBox = ({
  title, checkList, onChange, disabled, defaultValue,
}) => {
  const [checked, setChecked] = useState(defaultValue || {});

  const handleOnChange = (e) => {
    const key = e.target.value;
    const newChecked = {
      ...checked,
      [key]: !checked[key],
    };
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <>
      {
        title
        && (
          <FormLabel style={{
            color: disabled ? 'gray' : 'black',
            marginRight: 5,
            verticalAlign: 'middle',
          }}
          >
            {`${title} : `}
          </FormLabel>
        )
      }
      {
        checkList.map((element) => (
          <GridItem key={element.value} xs={6} sm={6} md={4}>
            <FormControlLabel
              control={(
                <Checkbox
                  disabled={disabled}
                  checked={Boolean(checked[element.value])}
                  color="primary"
                  value={element.value}
                  onChange={handleOnChange}
                />
              )}
              style={{ marginRight: 10 }}
              label={element.title}
            />
          </GridItem>
        ))
      }
    </>
  );
};

CommonCheckBox.propTypes = {
  checkList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.shape({}),
};

CommonCheckBox.defaultProps = {
  title: undefined,
  defaultValue: undefined,
  disabled: false,
};

export default CommonCheckBox;
