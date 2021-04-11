import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { permissionGroupMap } from '../../../constants/constants';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';

const PermissionCheckBox = ({
  permissions, defaultValue, onChange, disabled,
}) => {
  const [checked, setChecked] = useState(defaultValue || {});

  const permissionGroup = _(permissions).groupBy((x) => x.scope.split(':')[0])
    .map((value, key) => ({ groupKey: key, content: value })).value();

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
    <div style={{ marginTop: 10 }}>
      <Typography>權限設置</Typography>
      {
        permissionGroup.map((group) => (
          <div key={group.groupKey}>
            <Typography
              style={{ marginTop: 10, color: 'grey' }}
            >
              {permissionGroupMap[group.groupKey]}
            </Typography>
            <GridContainer>
              {
                group.content.map((part) => (
                  <GridItem key={part.value} xs={6} sm={6} md={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          disabled={disabled}
                          checked={Boolean(checked[part.value])}
                          color="primary"
                          value={part.value}
                          onChange={handleOnChange}
                        />
                      )}
                      label={part.title}
                      style={{ marginRight: 10 }}
                    />
                  </GridItem>
                ))
              }
            </GridContainer>
            <Divider />
          </div>
        ))
      }
    </div>
  );
};

PermissionCheckBox.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({}).isRequired,
  permissions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

PermissionCheckBox.defaultProps = {
  disabled: false,
};

export default PermissionCheckBox;
