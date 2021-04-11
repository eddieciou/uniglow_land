import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isToday as checkIsToday } from '../../utils/datetimeUtils';

const WeekTableDateHeader = ({ dateStrArray, onClickPreviousWeek, onClickNextWeek }) => {
  const classes = userStyles();

  const weekList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  return (
    <div className={classes.root}>
      <div className={classes.start}>
        <div
          tabIndex={0}
          role="button"
          aria-label="previous week"
          className={classes.leftArrow}
          onMouseUp={onClickPreviousWeek}
        />
      </div>

      {dateStrArray.map((part, index) => {
        const today = new Date();
        const dateObject = new Date(part);
        const beforeToday = dateObject < today;
        const isToday = checkIsToday(part);
        const isSunday = dateObject.getDay() === 0;

        return (
          <div
            style={{
              width: '12%',
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
              borderRightColor: '#DFDFDF',
              backgroundColor: isToday && '#E8EEEC',
              textAlign: 'center',
              color: (beforeToday || isSunday) && '#D5D5D5',
            }}
            key={part}
          >
            {isToday && <div className={classes.today}>TODAY</div>}
            <div style={{ paddingTop: isToday ? 20 : 40 }}>
              {weekList[index]}
            </div>
            <div className={classes.date}>{part.substr(8, 2)}</div>
          </div>
        );
      })}

      <div className={classes.start}>
        <div
          tabIndex={0}
          role="button"
          aria-label="previous week"
          className={classes.rightArrow}
          onMouseUp={onClickNextWeek}
        />
      </div>
    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    height: '120px',
  },
  start: {
    width: '8%',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderRightColor: '#DFDFDF',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    height: 20,
    backgroundColor: '#53B5A4',
    color: 'white',
  },
  date: {
    marginTop: -10,
    fontSize: 35,
    fontWeight: 'bold',
  },
  rightArrow: {
    marginTop: 10,
    width: '40px',
    height: '40px',
    borderBottom: '10px solid #53B5A4',
    borderLeft: '10px solid #53B5A4',
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
    transform: 'rotate(225deg)',
    outline: 'none',
  },
  leftArrow: {
    marginTop: 10,
    width: '40px',
    height: '40px',
    borderTop: '10px solid #53B5A4',
    borderLeft: '10px solid #53B5A4',
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
    transform: 'rotate(-45deg)',
    outline: 'none',
  },
}));

WeekTableDateHeader.propTypes = {
  dateStrArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeekTableDateHeader;
