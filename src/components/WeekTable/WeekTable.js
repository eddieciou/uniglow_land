import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WeekTableDateHeader from './WeekTableDateHeader';
import WeekTableRowContent from './WeekTableRowContent';
import { monthStrArray, durationObjectArray } from '../../constants/constants';
import { isToday, getToday } from '../../utils/datetimeUtils';

const WeekTable = ({
  dateStrArray, data, style, renderContent, onClickPreviousWeek, onClickNextWeek, contentUnderline, isTodayMask,
}) => {
  const classes = userStyles();

  const tittle = `${dateStrArray[0].substr(0, 4)} ${monthStrArray[parseInt(dateStrArray[0].substr(5, 2), 10) - 1]}`;
  const today = getToday();
  const limitDate = new Date(new Date().setDate(new Date().getDate() + 14));
  const getDateInfoArray = dateStrArray.map((part) => {
    const dateObject = new Date(part);
    return {
      date: part,
      isToday: isToday(part),
      isSunday: dateObject.getDay() === 0,
      beforeToday: dateObject < today,
      isLimitDate: dateObject > limitDate,
    };
  });

  return (
    <div className={classes.root} style={style}>
      <div className={classes.tittle}>{tittle}</div>
      <WeekTableDateHeader
        dateStrArray={dateStrArray}
        onClickPreviousWeek={onClickPreviousWeek}
        onClickNextWeek={onClickNextWeek}
      />
      {
        durationObjectArray.map((part, index) => (
          <WeekTableRowContent
            key={part.startTime}
            startTime={part.startTime}
            endTime={part.endTime}
            dateData={data[index]}
            dateInfoArray={getDateInfoArray}
            renderContent={renderContent}
            contentUnderline={contentUnderline}
            isTodayMask={isTodayMask}
          />
        ))
      }
    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {

  },
  tittle: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px 0 10px 0',
  },
}));

WeekTable.propTypes = {
  contentUnderline: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  dateStrArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickNextWeek: PropTypes.func.isRequired,
  onClickPreviousWeek: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  isTodayMask: PropTypes.bool,
};

WeekTable.defaultProps = {
  contentUnderline: false,
  style: {},
  isTodayMask: true,
};

export default WeekTable;
