import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VerifyPermission from '../../components/VerifyPermission';
import { apiDelete } from '../../services/reservation.service';

const ScheduleInformationPopover = ({
  reservationID, data, open, anchor, editable, onClose, onDelete,
}) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const [apiDeleting, setApiDeleting] = useState(false);
  const classes = userStyles();

  const submitDelete = () => {
    setApiDeleting(true);

    apiDelete(`/reservation_orders/${reservationID}`).then(
      (result) => {
        if (result.success) {
          onDelete();
        }
      },
    );
  };

  return (
    <Popover
      id="simple-popover"
      open={open}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={() => {
        if (!apiDeleting) {
          setCheckDelete(false);
          onClose();
        }
      }}

      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: !data && 'none',
          borderRadius: 10,
        },
      }}
      style={{
        backgroundColor: 'rgba(114,127,127,0.4)',
      }}
    >
      {!data && <div style={{ width: '50px', height: '50px' }}><CircularProgress /></div>}
      {
        data && (
        <div className={classes.root}>
          <div className={classes.label}>車身號碼</div>
          <div className={classes.content}>
            {data.motor_number}
          </div>
          <div className={classes.label}>聯繫客戶姓名</div>
          <div className={classes.content}>
            {data.contact_name || '無'}
          </div>
          <div className={classes.label}>聯繫客戶電話</div>
          <div className={classes.content}>
            {data.contact_phone || '無'}
          </div>
          <div className={classes.label}>客戶需求</div>
          <div
            className={classes.content}
            style={{
              minHeight: 24, maxWidth: '320px', maxHeight: '150px', overflow: 'auto',
            }}
          >
            {data.custom_requirement || '無'}
          </div>
          {checkDelete && (
            <div className={classes.deleteWrapper}>
              <div
                className={classes.deleteCheck}
              >
                {apiDeleting ? <CircularProgress size={20} /> : '請再次確認是否刪除?'}
              </div>
              <Button
                size="small"
                variant="contained"
                disableElevation
                className={classes.deleteCheckButton}
                style={{ backgroundColor: !apiDeleting && 'rgb(166,18,33)' }}
                onClick={submitDelete}
                disabled={apiDeleting}
              >
                是
              </Button>
              <Button
                size="small"
                variant="contained"
                disableElevation
                className={classes.deleteCheckButton}
                style={{ backgroundColor: !apiDeleting && 'rgb(30,133,211)' }}
                onClick={() => { setCheckDelete(false); }}
                disabled={apiDeleting}
              >
                否
              </Button>
            </div>
          )}
          {
            editable && !checkDelete && (
              <div className={classes.deleteWrapper}>
                <VerifyPermission
                  perform="reservation:delete"
                  yes={() => (
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      className={classes.delete}
                      onClick={() => { setCheckDelete(true); }}
                      style={{ marginRight: 5 }}
                    >
                      刪除
                    </Button>
                  )}
                />
                <VerifyPermission
                  perform="reservation:update"
                  yes={() => (
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      className={classes.update}
                      style={{ marginLeft: 5 }}
                      onClick={() => { window.location.href = `/reservation/reservation_order/edit/${reservationID}`; }}
                    >
                      變更預約
                    </Button>
                  )}
                />
              </div>
            )
          }
        </div>
        )
      }
    </Popover>
  );
};

const userStyles = makeStyles({
  root: {
    padding: 10,
    backgroundColor: 'rgba(245,245,245,0.7)',
    minWidth: '300px',
  },
  label: {
    paddingLeft: 3,
  },
  content: {
    backgroundColor: 'rgb(229,229,229)',
    padding: 5,
    borderRadius: 3,
    border: '1px solid rgba(204,204,204,1)',
    marginBottom: 5,
    minHeight: 24,
  },
  deleteWrapper: {
    display: 'flex',
    marginTop: 8,
    marginBottom: 3,
    alignItems: 'center',
  },
  delete: {
    color: 'white',
    backgroundColor: 'rgb(166,18,33)',
    flex: '1',
    borderRadius: 2,
  },
  update: {
    color: 'white',
    backgroundColor: 'rgb(30,133,211)',
    flex: '1',
    borderRadius: 2,
  },
  deleteCheck: {
    fontSize: 18,
    color: 'rgb(166,18,33)',
    flex: '1',
  },
  deleteCheckButton: {
    color: 'white',
    borderRadius: 2,
    minWidth: 10,
    marginLeft: 5,
    float: 'right',
  },
});

ScheduleInformationPopover.propTypes = {
  anchor: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  data: PropTypes.shape({
    motor_number: PropTypes.string.isRequired,
    contact_name: PropTypes.string.isRequired,
    contact_phone: PropTypes.string.isRequired,
    custom_requirement: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

ScheduleInformationPopover.defaultProps = {
  data: undefined,
};

export default ScheduleInformationPopover;
