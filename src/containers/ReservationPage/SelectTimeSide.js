import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from '../../components/Calendar/Calendar';
import Selector from '../../components/Selector/Selector';
import { durationObjectArray } from '../../constants/constants';

const SelectTimeSide = ({
  selectDate, onChangeSelectDate, selectedStartTime, onChangeSelectedStartTime, selectedSet, onChangeSet,
}) => {
  const toDay = new Date();
  const limitDate = new Date(new Date().setDate(new Date().getDate() + 14));
  const setArray = [
    { title: '基礎保養(1hr)', hours: 1 },
    { title: '車輛檢修(2hr)', hours: 2 },
    { title: '重大檢修(3hr)', hours: 3 },
  ];

  const classes = userStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>選定日期 / 起始時間與套餐</div>
      <div className={classes.calendarTitle}>行事曆選定日期</div>
      <div className={classes.centerWrapper}>
        <Calendar
          onSelect={(date) => { onChangeSelectDate(date); }}
          selected={selectDate}
          minDate={toDay}
          maxDate={limitDate}
          disabledDays={[0]}
        />
      </div>
      <div className={classes.selectorTitle}>選擇起始時間</div>
      <div className={classes.centerWrapper}>
        <Selector
          style={{ padding: 3 }}
          onChange={(value) => { onChangeSelectedStartTime(value); }}
          value={selectedStartTime}
          selectors={durationObjectArray}
          selectKey="startTime"
          displayEmpty
        />
      </div>
      <div className={classes.selectorTitle}>選擇種類</div>
      <div className={classes.centerWrapper}>
        <Selector
          style={{ padding: 3 }}
          onChange={(value) => { onChangeSet(value); }}
          value={selectedSet}
          selectors={setArray}
          selectKey="hours"
        />
      </div>
    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    boxShadow: '5px 0 5px -2px #CBCBCB',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: '#c7c7c7',
    fontWeight: 'bold',
  },
  calendarTitle: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  centerWrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  selectorTitle: {
    marginTop: 60,
    fontWeight: 'bold',
  },
}));

export default SelectTimeSide;
