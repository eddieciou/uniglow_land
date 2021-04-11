import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, InputAdornment } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import authSelectors from '../../selectors/auth.selectors';
import MainLayout from '../MainLayout/MainLayout';
import BookMarkBar from '../../components/Bar/BookMarkBar';
import ReservationCard from './ReservationCard';
import { convertYYMMDDofDatetimeObject } from '../../utils/datetimeUtils';
import { get } from '../../services/reservation.service';
import IconDatePicker from '../../components/DatePicker/IconDatePicker';

class ListReservationPage extends Component {
  state = {
    selectedDate: new Date(),
    enableExport: false,
    searchInput: '',
    arrivedBookMarked: false,
    reservationData: {},
    apiFetched: false,
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    this.getDataByDate(selectedDate);
  }

  onSelectDate = (date) => {
    this.setState({ selectedDate: date, apiFetched: false });
    this.getDataByDate(date);
  }

  getDataByDate = (date) => {
    const { shop_id: shopId } = this.props.user;
    get(`/reservation_orders?date=${convertYYMMDDofDatetimeObject(date)}&shop_id=${shopId}`).then(
      (result) => {
        this.setState({ reservationData: result, apiFetched: true });
      },
    );
  }

  render() {
    const { classes } = this.props;
    const {
      enableExport, searchInput, arrivedBookMarked, apiFetched, reservationData, selectedDate,
    } = this.state;
    const { num_of_arrived: numOfArrived, num_of_not_arrived: numOfNotArrived } = reservationData;

    let { result: daraArray } = reservationData;
    daraArray = _.orderBy(daraArray, ['start_time'], ['asc']);
    if (searchInput) {
      daraArray = _.filter(daraArray,
        (o) => o.motor_number.includes(searchInput)
          || o.contact_name.includes(searchInput)
          || o.plate_number.includes(searchInput));
    }

    const bookMarkData = [{ value: false, title: '未到' }, { value: true, title: '已到' }];

    return (
      <MainLayout padding={0}>
        <div className={classes.titleBar}>
          <div style={{ flex: 1 }}>您可以在此查詢當日已預約的客戶之資料</div>
          { enableExport && <Button className={classes.exportButton} endIcon={<GetAppIcon />}>匯出資料</Button>}
        </div>

        {
          !apiFetched ? <CircularProgress style={{ margin: 10 }} />
            : (
              <>
                <div className={classes.searchBar}>
                  <div style={{ flex: 1, display: 'flex' }}>
                    <div style={{ fontSize: 20, marginRight: '5%' }}>
                      {convertYYMMDDofDatetimeObject(selectedDate, ' / ')}
                      {' '}
                      預約
                    </div>
                    <div style={{ fontSize: 20, marginRight: '5%' }}>
                      已到人數 :
                      {' '}
                      {numOfArrived}
                    </div>
                    <div style={{ fontSize: 20, marginRight: '5%' }}>
                      未到人數 :
                      {' '}
                      {numOfNotArrived}
                    </div>
                  </div>
                  <TextField
                    size="small"
                    label="請輸入姓名/車身號碼/車牌搜尋"
                    value={searchInput}
                    onChange={(e) => { this.setState({ searchInput: e.target.value }); }}
                    style={{ float: 'right', width: '25%' }}
                    variant="outlined"
                    InputProps={{
                      type: 'search',
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <BookMarkBar
                  content={bookMarkData}
                  picked={arrivedBookMarked}
                  onChange={(value) => { this.setState({ arrivedBookMarked: value }); }}
                  InputProps={{
                    endAdornment: (
                      <IconDatePicker
                        color="#1db898"
                        style={{ marginRight: '3vh' }}
                        selected={selectedDate}
                        onChange={this.onSelectDate}
                      />),
                  }}
                />

                <div style={{ flex: 'auto', overflow: 'auto' }}>
                  {
                    daraArray.map(
                      (part) => (
                        part.arrived === arrivedBookMarked
                        && <ReservationCard key={part.id} data={part} editable={selectedDate > new Date()} />
                      ),
                    )
                  }
                  {
                    !arrivedBookMarked
                    && reservationData.num_of_not_arrived === 0
                    && <div className={classes.noData}>本日暫無未到預約</div>
                  }
                  {
                    arrivedBookMarked
                    && reservationData.num_of_arrived === 0
                    && <div className={classes.noData}>本日暫無已到預約</div>
                  }
                </div>
              </>
            )
        }
      </MainLayout>
    );
  }
}

const styles = () => ({
  titleBar: {
    padding: '8px 4vh 6px 2vh',
    backgroundColor: 'white',
    borderBottom: '1px solid #DFDFDF',
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: 'white',
    padding: '8px 4vh 5px 2vh',
    display: 'flex',
    alignItems: 'center',
  },
  exportButton: {
    float: 'right',
    color: 'white',
    borderRadius: 2,
    width: '10%',
    backgroundColor: '#53B5A4',
    padding: 1,
  },
  noData: {
    textAlign: 'center',
    marginTop: '15%',
    fontSize: 20,
    color: 'grey',
  },
});

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

const withStyleListReservationPage = withStyles(styles)(ListReservationPage);

export default connect(mapStateToProps)(withStyleListReservationPage);
