import PropTypes from 'prop-types';
import React from 'react';
import 'react-infinite-calendar/styles.css';
import InfiniteCalendar from 'react-infinite-calendar';

const Calendar = ({
  selected, minDate, minMonth, maxDate, maxMonth, disabledDays, onSelect,
}) => (
  <InfiniteCalendar
    onSelect={onSelect}
    selected={selected}
    displayOptions={{
      layout: 'portrait',
    }}
    width="85%"
    height={200}
    minDate={minDate}
    maxDate={maxDate}
    min={minMonth || minDate}
    max={maxMonth || maxDate}
    disabledDays={disabledDays}
    locale={{
      locale: require('date-fns/locale/zh-TW'),
      headerFormat: 'M月 D日',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      blank: '選擇日期',
      todayLabel: {
        long: '返回今日',
        short: '今日',
      },
    }}
    theme={{
      selectionColor: 'rgb(83,181,164)',
      textColor: {
        default: '#333',
        active: '#FFF',
      },
      weekdayColor: 'rgba(80,213,189,0.86)',
      headerColor: 'rgb(83,181,164)',
      floatingNav: {
        background: 'rgba(21,141,120,0.96)',
        color: '#FFF',
        chevron: '#ff0076',
      },
    }}
  />
);

Calendar.propTypes = {
  disabledDays: PropTypes.arrayOf(PropTypes.number),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minMonth: PropTypes.instanceOf(Date),
  maxMonth: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
};

Calendar.defaultProps = {
  disabledDays: [],
  minDate: undefined,
  maxDate: undefined,
  minMonth: undefined,
  maxMonth: undefined,
};

export default Calendar;
