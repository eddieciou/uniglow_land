import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import MainLayout from '../MainLayout/MainLayout';
import authSelectors from '../../selectors/auth.selectors';
import { convertToChineseDateStr, convertYYMMDDofDatetimeObject } from '../../utils/datetimeUtils';
import SelectTimeSide from './SelectTimeSide';
import {
  get, post, patch, put,
} from '../../services/reservation.service';

class CreateReservationPage extends Component {
  toDay = new Date();

  state= {
    reservationId: this.props.match.params.reservationId,
    reservationFetched: false,
    selectedDate: (this.props.match.params.selectedDate && new Date(this.props.match.params.selectedDate))
      || this.toDay,
    originDate: undefined,
    originStartTime: undefined,
    selectedStartTime: this.props.match.params.selectedStartTime || '',
    selectedSet: 1,
    plateNumber: '',
    motorNumber: '',
    inputMotorNumber: '',
    name: '',
    phone: '',
    customRequirement: '',
    plateNumberErrorMessage: undefined,
    motorNumberErrorMessage: undefined,
    resultMessage: undefined,
    motorChecking: false,
    disableInputMotorNumber: true,
    apiRequesting: false,
  }

  componentDidMount() {
    if (this.state.reservationId) {
      get(`/reservation_orders/${this.state.reservationId}`).then(
        (result) => {
          const {
            date, start_time: startTime, plate_number: plateNumber, motor_number: motorNumber,
            contact_name: name, contact_phone: phone, custom_requirement: customRequirement,
          } = result.result;
          this.setState({
            selectedDate: new Date(date),
            originDate: new Date(date),
            selectedStartTime: startTime,
            originStartTime: startTime,
            plateNumber,
            motorNumber,
            name,
            phone,
            customRequirement,
          });
          this.setState({ reservationFetched: true });
        },
      );
    }
  }

  onPlateNumberInputBlur = (e) => {
    this.setState({ motorChecking: true });
    if (e.target.value) {
      get(`/check_motor?plate_number=${e.target.value}`).then(
        (result) => { this.setState({ motorNumber: result.motor_number, motorChecking: false }); },
      ).catch(
        (result) => {
          this.setState({
            plateNumberErrorMessage: result.status === 404
              ? '系統查無車輛' : JSON.stringify(result.message, 0, 0),
            motorChecking: false,
          });
        },
      );
    }
  }

  onMotorNumberInputBlur = (e) => {
    this.setState({ motorChecking: true });
    get(`/check_motor?motor_number=${e.target.value}`).then(
      (result) => {
        this.setState({
          motorChecking: false,
          motorNumber: result.motor_number,
        });
      },
    ).catch(
      (error) => {
        this.setState({
          motorNumberErrorMessage: error.status === 404
            ? '系統查無車輛' : JSON.stringify(error.message, 0, 0),
          motorChecking: false,
        });
      },
    );
  }

  genEndTime = () => {
    const { selectedStartTime, selectedSet } = this.state;
    return `${parseInt(selectedStartTime.substr(0, 2), 10) + selectedSet}:00:00`;
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      selectedDate, selectedStartTime, customRequirement, plateNumber, motorNumber, name, phone, reservationId,
      originDate, originStartTime,
    } = this.state;

    if (reservationId) {
      if (!_.isEqual(originDate, selectedDate) || !_.isEqual(selectedStartTime, originStartTime)) {
        this.setState({ apiRequesting: true });
        const body = {
          shop_id: this.props.user.shop_id,
          date: convertYYMMDDofDatetimeObject(selectedDate),
          start_time: selectedStartTime,
          end_time: this.genEndTime(),
          contact_name: name,
          contact_phone: phone,
          custom_requirement: customRequirement,
        };
        put(`/reservation_orders/${reservationId}`, body).then(
          (result) => {
            if (result.success) {
              this.setState({
                resultMessage: { type: 'success', message: `${plateNumber} 修改成功` },
                name: '',
                phone: '',
                customRequirement: '',
                plateNumber: '',
                motorNumber: '',
                plateNumberErrorMessage: undefined,
                inputMotorNumber: '',
                apiRequesting: false,
              });
              window.scrollTo(0, 0);
            }
          },
        ).catch(
          (result) => {
            this.setState({
              resultMessage: { type: 'error', message: JSON.stringify(result.message) },
              apiRequesting: false,
            });
            window.scrollTo(0, 0);
          },
        );
      } else {
        this.setState({ apiRequesting: true });
        const body = {
          contact_name: name,
          contact_phone: phone,
          custom_requirement: customRequirement,
        };
        patch(`/reservation_orders/${reservationId}`, body).then(
          (result) => {
            if (result.success) {
              this.setState({
                apiRequesting: false,
                resultMessage: { type: 'success', message: `${plateNumber} 修改成功` },
                selectedDate: this.toDay,
                reservationId: undefined,
                plateNumber: '',
                motorNumber: '',
                name: '',
                phone: '',
                customRequirement: '',
              });
            }
          },
        );
      }
    } else {
      this.setState({ apiRequesting: true });
      const body = {
        shop_id: this.props.user.shop_id,
        plate_number: plateNumber,
        motor_number: motorNumber,
        date: convertYYMMDDofDatetimeObject(selectedDate),
        start_time: selectedStartTime,
        end_time: this.genEndTime(),
        contact_name: name,
        contact_phone: phone,
        custom_requirement: customRequirement,
      };
      post('/reservation_orders', body).then(
        (result) => {
          if (result.success) {
            this.setState({
              resultMessage: { type: 'success', message: `${plateNumber} 預約成功` },
              name: '',
              phone: '',
              customRequirement: '',
              plateNumber: '',
              motorNumber: '',
              plateNumberErrorMessage: undefined,
              inputMotorNumber: '',
              apiRequesting: false,
            });
            window.scrollTo(0, 0);
          }
        },
      ).catch(
        (result) => {
          this.setState({
            resultMessage: { type: 'error', message: JSON.stringify(result.message) },
            apiRequesting: false,
          });
          window.scrollTo(0, 0);
        },
      );
    }
  }

  render() {
    const { classes } = this.props;
    const {
      selectedDate, selectedStartTime, selectedSet, plateNumber, motorNumber, name, phone, customRequirement,
      plateNumberErrorMessage, resultMessage, motorChecking, disableInputMotorNumber, motorNumberErrorMessage,
      inputMotorNumber, reservationId, reservationFetched, apiRequesting,
    } = this.state;

    return (
      <MainLayout padding={0}>
        {
          resultMessage
          && (
            <Alert
              onClose={() => { this.setState({ resultMessage: undefined }); }}
              severity={resultMessage.type}
              style={{ minHeight: 40 }}
            >
              {resultMessage.message}
            </Alert>
          )
        }
        <div className={classes.tittle}>
          {reservationId ? '修改預約，您可以修改聯絡資訊或預約時間' : '新增預約，你可以在此新增預約時段、填寫預約車主的相關資料並完成預約。'}
        </div>
        <div className={classes.mainWrapper}>
          {
           reservationId && !reservationFetched ? <CircularProgress style={{ margin: 10 }} /> : (
             <>
               <SelectTimeSide
                 selectDate={selectedDate}
                 selectedStartTime={selectedStartTime}
                 selectedSet={selectedSet}
                 onChangeSelectDate={(value) => { this.setState({ selectedDate: value }); }}
                 onChangeSet={(value) => { this.setState({ selectedSet: value }); }}
                 onChangeSelectedStartTime={(value) => { this.setState({ selectedStartTime: value }); }}
               />

               <div className={classes.rightContent}>
                 <div className={classes.contentTittle}>再次確認日期、時段並填寫客戶基本資料</div>
                 <div className={classes.showDate}>
                   {convertToChineseDateStr(selectedDate)}
                 </div>
                 <div className={classes.showTime}>
                   {selectedStartTime
                     ? `下午 ${selectedStartTime.substr(0, 5)} - ${this.genEndTime().substr(0, 5)}`
                     : '尚未選取起始時間'}
                 </div>

                 <form onSubmit={this.onSubmit}>
                   <TextField
                     onChange={(e) => {
                       this.setState({
                         plateNumber: e.target.value,
                         plateNumberErrorMessage: undefined,
                         motorNumberErrorMessage: undefined,
                         motorNumber: '',
                         disableInputMotorNumber: true,
                         inputMotorNumber: '',
                       });
                     }}
                     onBlur={this.onPlateNumberInputBlur}
                     autoFocus
                     style={{ marginTop: 30 }}
                     label="車牌號碼"
                     value={plateNumber}
                     fullWidth
                     type="text"
                     margin="dense"
                     variant="outlined"
                     required
                     error={Boolean(plateNumberErrorMessage)}
                     helperText={plateNumberErrorMessage}
                     disabled={Boolean(reservationId)}
                   />

                   <div
                     style={{
                       marginTop: 30,
                       display: 'flex',
                       alignItems: 'center',
                     }}
                   >
                     <TextField
                       style={{
                         flex: 1,
                       }}
                       label="車身號碼"
                       value={motorNumber || inputMotorNumber || (disableInputMotorNumber && '輸入車牌號碼後查詢') || ''}
                       InputProps={{
                         endAdornment: motorChecking
                           && plateNumber
                           && <CircularProgress style={{ color: 'grey', padding: 10 }} />,
                       }}
                       disabled={disableInputMotorNumber || motorChecking}
                       fullWidth
                       type="text"
                       margin="dense"
                       variant="outlined"
                       onChange={(e) => {
                         this.setState({
                           inputMotorNumber: e.target.value,
                           motorNumberErrorMessage: undefined,
                           motorNumber: '',
                         });
                       }}
                       onBlur={this.onMotorNumberInputBlur}
                       error={Boolean(motorNumberErrorMessage)}
                       helperText={motorNumberErrorMessage}
                     />
                     {
                       plateNumberErrorMessage
                       && (
                         <Button
                           style={{
                             flex: 'right',
                             marginLeft: 10,
                             color: 'white',
                             borderRadius: 4,
                             backgroundColor: '#53B5A4',
                           }}
                           disableElevation
                           variant="contained"
                           onClick={() => { this.setState({ disableInputMotorNumber: false }); }}
                         >
                           手動輸入
                         </Button>
                       )
                     }
                   </div>

                   <TextField
                     onChange={(e) => { this.setState({ name: e.target.value }); }}
                     style={{ marginTop: 30 }}
                     label="聯繫客戶姓名"
                     value={name}
                     fullWidth
                     type="text"
                     margin="dense"
                     variant="outlined"
                     required
                   />

                   <TextField
                     onChange={(e) => { this.setState({ phone: e.target.value }); }}
                     style={{ marginTop: 30 }}
                     label="聯繫客戶電話"
                     value={phone}
                     fullWidth
                     type="text"
                     margin="dense"
                     variant="outlined"
                     required
                   />

                   <TextField
                     onChange={(e) => { this.setState({ customRequirement: e.target.value }); }}
                     style={{ marginTop: 30 }}
                     label="客戶需求"
                     multiline
                     rows={5}
                     fullWidth
                     value={customRequirement}
                     variant="outlined"
                   />

                   <Button
                     disableElevation
                     className={classes.submitButton}
                     type="submit"
                     variant="contained"
                     fullWidth
                     disabled={!motorNumber || !selectedStartTime || apiRequesting}
                   >
                     {apiRequesting && <CircularProgress size={20} style={{ marginRight: 10 }} />}
                     {reservationId ? '確認修改' : '確認預約'}
                   </Button>
                 </form>

               </div>
             </>
           )
          }
        </div>
      </MainLayout>
    );
  }
}

const styles = () => ({
  tittle: {
    padding: '1vh',
    backgroundColor: 'white',
    borderBottom: '1px solid #DFDFDF',
  },
  mainWrapper: {
    display: 'flex',
    minHeight: '89vh',
  },
  rightContent: {
    flex: 2,
    paddingTop: '10px',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  contentTittle: {
    fontSize: 16,
    color: '#c7c7c7',
    fontWeight: 'bold',
  },
  showDate: {
    marginTop: 20,
    fontSize: 15,
  },
  showTime: {
    marginTop: 10,
    fontSize: 25,
  },
  submitButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#53B5A4',
  },
});

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

const styleWithCreateReservationPage = withStyles(styles)(CreateReservationPage);

export default connect(mapStateToProps)(styleWithCreateReservationPage);
