import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import tw from 'date-fns/locale/zh-TW';

const twLocal = {
  ...tw,
  options: {
    weekStartsOn: 0,
  },
};

registerLocale('zhTW', twLocal);

const IconDatePicker = ({
  selected, onChange, style, color,
}) => (
  <div style={style}>
    <DatePicker
      locale="zhTW"
      selected={selected}
      onChange={onChange}
      customInput={(
        <IconButton>
          <DateRangeIcon style={{ color }} />
        </IconButton>
        )}
      popperPlacement="top-end"
      popperModifiers={{
        offset: {
          enabled: true,
          offset: '5px, 10px',
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: 'viewport',
        },
      }}
    />
  </div>
);

IconDatePicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
};

IconDatePicker.defaultProps = {
  color: undefined,
  style: undefined,
};

export default IconDatePicker;
