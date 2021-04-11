import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ScheduleInformationPopover from './ScheduleInformationPopover';
import { get } from '../../services/reservation.service';

const ScheduleBar = ({
  reservationID, length, arrived, editable, onClose,
}) => {
  const [hover, setHover] = useState(false);
  const [anchor, setAnchor] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const open = Boolean(anchor);

  const onClick = (event) => {
    setAnchor(event.currentTarget);
    if (!reservationData) {
      get(`/reservation_orders/${reservationID}`).then(
        (result) => {
          setReservationData(result.result);
        },
      );
    }
  };

  return !deleted && (
    <>
      <div
        aria-label="schedule-bar"
        tabIndex={0}
        role="button"
        onMouseUp={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: open || hover ? '#84c4fc' : '#c1dff8',
          width: '20px',
          height: `${length}px`,
          zIndex: 100,
          border: '1px solid rgba(0,0,0,0.3)',
          borderRadius: 3,
          cursor: 'pointer',
          outline: 'none',
          justifyContent: 'center',
          display: 'flex',
          paddingTop: 3,
        }}
      >
        {arrived
        && (
          <div style={{
            backgroundColor: '#d9eaf8',
            width: '15px',
            height: '15px',
            borderRadius: 999,
            border: '1px solid rgba(0,0,0,0.3)',
          }}
          />
        )}
      </div>
      <ScheduleInformationPopover
        reservationID={reservationID}
        data={reservationData}
        open={open}
        anchor={anchor}
        onClose={() => {
          setAnchor(false);
          onClose();
        }}
        onDelete={() => { setDeleted(true); }}
        editable={editable}
      />
    </>
  );
};

ScheduleBar.propTypes = {
  length: PropTypes.number.isRequired,
  reservationID: PropTypes.number.isRequired,
  arrived: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

ScheduleBar.defaultProps = {
  onClose: undefined,
};

export default ScheduleBar;
