import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const WeekTableRowContent = ({
  startTime, endTime, dateData, dateInfoArray, renderContent, contentUnderline, isTodayMask,
}) => {
  const classes = userStyles();

  return (
    <div className={classes.root}>
      <div className={classes.start}>{startTime.substr(0, 5)}</div>
      {
        dateData.map((part, index) => {
          const { isToday } = dateInfoArray[index];

          return (
            <div
              style={{
                width: '12%',
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: isTodayMask && isToday ? '#909090' : '#DFDFDF',
                backgroundColor: isToday && (!isTodayMask ? 'rgba(215,229,224,0.3)' : '#d7e5e0'),
                opacity: isTodayMask && isToday && 0.3,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                borderBottom: contentUnderline && `1px solid ${isTodayMask && isToday ? '#909090' : '#DFDFDF'}`,
              }}
              key={index.toString()}
            >
              {renderContent(dateData[index], dateInfoArray[index], startTime, endTime)}
            </div>
          );
        })
      }
    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    display: 'flex',
  },
  start: {
    width: '8%',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderRightColor: '#DFDFDF',
    fontSize: 18,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },

}));

WeekTableRowContent.propTypes = {
  dateData: PropTypes.arrayOf(PropTypes.any).isRequired,
  dateInfoArray: PropTypes.arrayOf(PropTypes.shape({
    isToday: PropTypes.bool,
    isSunday: PropTypes.bool,
    beforeToday: PropTypes.bool,
  })).isRequired,
  startTime: PropTypes.string.isRequired,
  contentUnderline: PropTypes.bool,
  isTodayMask: PropTypes.bool,
};

WeekTableRowContent.defaultProps = {
  contentUnderline: false,
  isTodayMask: true,
};

export default WeekTableRowContent;
