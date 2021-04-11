import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import VerifyPermission from '../../components/VerifyPermission';
import { apiDelete } from '../../services/reservation.service';

const ReservationCard = ({ data, editable }) => {
  const classes = userStyles();
  const [anchorCustomRequirement, setAnchorCustomRequirement] = useState(null);
  const [checkDelete, setCheckDelete] = useState(false);
  const [apiDeleting, setApiDeleting] = useState(false);

  const open = Boolean(anchorCustomRequirement);

  const submitDelete = () => {
    setApiDeleting(true);

    apiDelete(`/reservation_orders/${data.id}`).then(
      (result) => {
        if (result.success) {
          window.location.reload(true);
        }
      },
    );
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: checkDelete ? 'rgba(255,169,111,0.49)' : 'white',
      }}
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <div style={{ fontSize: 20, color: '#53B5A4' }}>
            {data.contact_name}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div className={classes.commonFont}>
            車牌：
            {data.plate_number}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div className={classes.commonFont}>
            車身號碼：
            {data.motor_number}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div className={classes.commonFont} style={{ color: 'grey' }}>
            電話：
            {data.contact_phone}
          </div>
        </GridItem>
      </GridContainer>

      <div style={{ marginTop: 20 }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <div className={classes.commonFont} style={{ color: '#53B5A4' }}>
              預約單號：
              {data.id}
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <div className={classes.commonFont} style={{ color: '#53B5A4' }}>
              預約時間：
              {data.start_time}
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <div className={classes.commonFont} style={{ color: 'grey' }}>
              套餐名稱：基礎保養
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <div className={classes.commonFont} style={{ color: 'grey' }}>
              工時：
              {data.working_hours}
              {' '}
              hr
            </div>
          </GridItem>
        </GridContainer>
      </div>

      <div className={classes.bottomWrapper}>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={(event) => { setAnchorCustomRequirement(event.currentTarget); }}
          onMouseLeave={() => { setAnchorCustomRequirement(null); }}
          className={classes.customRequirement}
        >
          客戶需求：
          {data.custom_requirement || '無'}
        </Typography>

        {checkDelete && (
          <div className={classes.editWrapper}>
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
              disabled={apiDeleting}
              onClick={submitDelete}
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
            <div className={classes.editWrapper}>
              <VerifyPermission
                perform="reservation:update"
                yes={() => (
                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    className={classes.update}
                    onClick={() => { window.location.href = `/reservation/reservation_order/edit/${data.id}`; }}
                  >
                    變更預約
                  </Button>
                )}
              />

              <VerifyPermission
                perform="reservation:delete"
                yes={() => (
                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    className={classes.delete}
                    onClick={() => { setCheckDelete(true); }}
                  >
                    刪除預約
                  </Button>
                )}
              />
            </div>
          )
        }

      </div>

      {
        data.custom_requirement && (
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            open={open}
            anchorEl={anchorCustomRequirement}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={() => setAnchorCustomRequirement(null)}
            disableRestoreFocus
          >
            <div className={classes.popoverContent}>
              {data.custom_requirement}
            </div>
          </Popover>
        )
      }
    </div>
  );
};

const userStyles = makeStyles({
  root: {
    borderBottom: '1px solid #bab9b9',
    padding: '8px 4vh 6px 2vh',
  },
  commonFont: {
    fontSize: 16,
  },

  bottomWrapper: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  customRequirement: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 500,
    fontSize: 16,
    color: 'grey',
  },
  editWrapper: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  update: {
    color: 'white',
    backgroundColor: 'rgb(30,133,211)',
    borderRadius: 2,
    minWidth: 100,
  },
  delete: {
    color: 'white',
    backgroundColor: 'rgb(166,18,33)',
    borderRadius: 2,
    minWidth: 100,
    marginLeft: 20,
  },
  deleteCheck: {
    fontSize: 18,
    color: 'rgb(166,18,33)',
  },
  deleteCheckButton: {
    color: 'white',
    borderRadius: 2,
    minWidth: 100,
    marginLeft: 20,
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    overflow: 'hidden',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    maxWidth: 500,
    padding: 20,
  },

});

export default ReservationCard;
