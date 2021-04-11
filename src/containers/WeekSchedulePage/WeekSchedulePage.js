import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MainLayout from '../MainLayout/MainLayout';
import authSelectors from '../../selectors/auth.selectors';
import {
  convertYYMMDDofDatetimeObject,
  getEndDateStrOfWeekByDate,
  getFirstDateStrOfWeekByDate, getWeekDateStrArrayByDate,
} from '../../utils/datetimeUtils';
import WeekTable from '../../components/WeekTable/WeekTable';
import TableContent from './TableContent';
import { get } from '../../services/reservation.service';

class WeekSchedulePage extends Component {
  state = {
    dateAnchor: undefined,
    dateStrArray: undefined,
    apiFetched: false,
    data: undefined,
    shopId: this.props.user.shop_id || 'AIS002',
    shopList: undefined,
  }

  componentDidMount() {
    const { shop_id: propsShop } = this.props.user;
    if (!propsShop) {
      this.getShopList();
    }
    this.getDataByDateAnchor(new Date());
  }

  getShopList = () => {
    get('/shops').then((response) => {
      this.setState({
        shopList: response.result.filter((part) => !['AISXXX', 'AIS899', 'AIS014'].includes(part.shop_id)),
      });
    });
  }

  getDataByDateAnchor = (datetimeObject) => {
    const { shopId } = this.state;
    this.setState({ apiFetched: false });

    const startTime = convertYYMMDDofDatetimeObject(getFirstDateStrOfWeekByDate(datetimeObject));
    const endTime = convertYYMMDDofDatetimeObject(getEndDateStrOfWeekByDate(datetimeObject));

    get(`/schedule?start_date=${startTime}&end_date=${endTime}&shop_id=${shopId}`).then((result) => {
      this.setState({
        apiFetched: true,
        dateStrArray: getWeekDateStrArrayByDate(datetimeObject),
        dateAnchor: (datetimeObject),
        data: result.result,
      });
    });
  }

  onClickPreviousWeek = () => {
    const { dateAnchor } = this.state;
    this.getDataByDateAnchor(new Date(dateAnchor.setDate(dateAnchor.getDate() - 7)));
  }

  onClickNextWeek = () => {
    const { dateAnchor } = this.state;
    this.getDataByDateAnchor(new Date(dateAnchor.setDate(dateAnchor.getDate() + 7)));
  }

  onChangeShop = (event, value) => {
    this.setState({ shopId: value.shop_id }, () => {
      this.getDataByDateAnchor(new Date());
    });
  }

  renderTableContent = (data, dateInfo, startTime) => (
    <TableContent data={data} dateInfo={dateInfo} startTime={startTime} />
  )

  render() {
    const {
      apiFetched, data, dateStrArray, shopList,
    } = this.state;
    const { shop_id: propsShop } = this.props.user;
    const { classes } = this.props;

    return (
      <MainLayout padding={0}>
        <div style={{
          backgroundColor: 'white',
          padding: 10,
          borderBottom: '1px solid #DFDFDF',
        }}
        >
          {
            propsShop ? '當週預約列表，您可以在此預覽已訂之時段，可點擊時段確認預約客戶的詳細資料或新增預約。' : shopList && (
              <Autocomplete
                id="combo-box-demo"
                disableClearable
                defaultValue={shopList.filter((part) => part.shop_id === 'AIS002')[0]}
                options={shopList || []}
                getOptionLabel={(option) => `[${option.shop_id}] ${option.name}`}
                getOptionSelected={(option, value) => option.shop_id === value.shop_id}
                style={{ width: 250, marginLeft: 20 }}
                onChange={this.onChangeShop}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    margin="dense"
                    variant="outlined"
                  />
                )}
              />
            )
          }
        </div>
        {
          !apiFetched ? <CircularProgress style={{ marginTop: 10 }} />
            : (
              <>
                <WeekTable
                  data={data}
                  dateStrArray={dateStrArray}
                  renderContent={this.renderTableContent}
                  onClickNextWeek={this.onClickNextWeek}
                  onClickPreviousWeek={this.onClickPreviousWeek}
                  contentUnderline
                  isTodayMask={false}
                />
                <div style={{ paddingLeft: 10, marginTop: 20 }}>
                  <div style={{ display: 'flex' }}>
                    <div className={classes.guest} />
                    : 未建立預約單的自來客
                  </div>
                  <div style={{ display: 'flex', marginTop: 5 }}>
                    <div className={classes.reservation} />
                    : 未到店之預約單
                  </div>
                  <div style={{ display: 'flex', marginTop: 5 }}>
                    <div className={classes.reservation}>
                      <div className={classes.arrived} />
                    </div>
                    : 已到店之預約單
                  </div>
                  <div style={{ display: 'flex', marginTop: 5 }}>
                    <span className={classes.reservable} />
                    : 可預約之工位
                  </div>
                </div>
              </>
            )
        }
      </MainLayout>
    );
  }
}

const styles = () => ({
  guest: {
    backgroundColor: '#ffdbc0',
    width: '15px',
    height: '15px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.3)',
    marginTop: 3,
    marginRight: 5,
  },
  reservation: {
    paddingTop: 1,
    paddingLeft: 1,
    verticalAlign: 'middle',
    height: '20px',
    width: '40px',
    border: '1px solid rgba(0,0,0,0.3)',
    borderRadius: 3,
    backgroundColor: '#c1dff8',
    marginTop: 1,
    marginRight: 5,
  },
  arrived: {
    backgroundColor: '#d9eaf8',
    width: '15px',
    height: '15px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.3)',
  },
  reservable: {
    borderStyle: 'solid',
    borderWidth: '0 20px 20px 0',
    borderColor: 'transparent',
    borderRightColor: 'rgba(40,255,101,0.84)',
    marginRight: 5,
  },
});

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

const withStylesWeekSchedulePage = withStyles(styles)(WeekSchedulePage);

export default connect(mapStateToProps)(withStylesWeekSchedulePage);
