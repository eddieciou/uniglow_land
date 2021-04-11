import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import ScheduleBar from './ScheduleBar';

const TableContent = ({ data, dateInfo, startTime }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(false);
  };

  const checkTodayReservable = () => {
    const now = new Date();
    const limitHour = now.getHours() + 3;
    const currentHour = parseInt(startTime.substring(0, 2), 10);
    return currentHour > limitHour;
  };

  let reservable = !dateInfo.beforeToday && !dateInfo.isLimitDate && data[2] > 0;
  if (dateInfo.isToday) {
    reservable = reservable && (dateInfo.isToday && checkTodayReservable());
  }

  const popoverOpen = Boolean(anchorEl);
  const classes = userStyles();

  return (
    <div
      className={classes.root}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <div className={classes.guest}>
        {data[1].map((part) => <div key={part} className={classes.guestDot} />)}
      </div>
      <div className={classes.reservation}>
        {
          data[0].map((part, index) => (
            part && !_.isEmpty(part)
              ? (
                <ScheduleBar
                  key={part[0]}
                  reservationID={part[0]}
                  length={part[1] * 31}
                  arrived={part[2]}
                  editable={!dateInfo.beforeToday}
                  onClose={handlePopoverClose}
                />
              )
              : <div key={index.toString()} style={{ width: '20px' }} />
          ))
        }
      </div>

      {
        reservable && (
          <span
            style={{
              borderStyle: 'solid',
              borderWidth: '0 5px 5px 0',
              borderColor: 'transparent',
              borderRightColor: 'rgba(40,255,101,0.84)',
              position: 'absolute',
              top: '0px',
              right: '0px',
              zIndex: 100,
            }}
          />
        )
      }

      <div
        tabIndex={0}
        role="button"
        aria-label="duration_workstation"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: popoverOpen && (reservable ? 'rgba(129,198,189,0.48)' : 'rgba(255,166,166,0.48)'),
          outline: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'rgba(35,35,35,0.55)',
        }}
        onMouseUp={() => {
          if (reservable) {
            window.location.href = `/reservation/reservation_order/create/${dateInfo.date}/${startTime}`;
          }
        }}
      >
        {popoverOpen && reservable && '可預約'}
      </div>

    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  guest: {
    flex: 1,
    padding: 4,
    display: 'flex',
    overflow: 'auto',
  },
  reservation: {
    height: '30px',
    display: 'flex',
    float: 'right',
  },
  guestDot: {
    backgroundColor: '#ffdbc0',
    width: '15px',
    height: '15px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.3)',
    marginRight: 5,
  },
}));

export default TableContent;
