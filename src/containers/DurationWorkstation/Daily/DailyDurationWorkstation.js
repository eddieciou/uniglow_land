import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import authSelectors from '../../../selectors/auth.selectors';
import MainLayout from '../../MainLayout/MainLayout';
import WeekTable from '../../../components/WeekTable/WeekTable';
import { get } from '../../../services/reservation.service';
import {
  convertYYMMDDofDatetimeObject,
  getFirstDateStrOfWeekByDate,
  getEndDateStrOfWeekByDate,
  getWeekDateStrArrayByDate,
} from '../../../utils/datetimeUtils';
import TableContent from './TableContent';
import VerifyPermission from '../../../components/VerifyPermission';

class DailyDurationWorkstation extends Component {
  state = {
    dateAnchor: undefined,
    dateStrArray: undefined,
    workstationNumSelectors: 0,
    apiFetched: false,
    data: undefined,
  }

  componentDidMount() {
    this.getDataByDateAnchor(new Date());
  }

  getDataByDateAnchor = (datetimeObject) => {
    this.setState({ apiFetched: false });

    const { shop_id: shopId } = this.props.user;
    const startTime = convertYYMMDDofDatetimeObject(getFirstDateStrOfWeekByDate(datetimeObject));
    const endTime = convertYYMMDDofDatetimeObject(getEndDateStrOfWeekByDate(datetimeObject));

    Promise.all([
      get(`/shops/${shopId}/workstation`),
      get(`/shops/${shopId}/daily_shop_duration_workstation?start_date=${startTime}&end_date=${endTime}`),
    ]).then(
      ([workstationNum, dailyWorkstation]) => {
        const selectors = [...Array(workstationNum.workstation_num + 1).keys()].map((element) => (
          { value: element, title: element.toString() }
        ));

        this.setState({
          apiFetched: true,
          workstationNumSelectors: selectors,
          data: dailyWorkstation.result,
          dateStrArray: getWeekDateStrArrayByDate(datetimeObject),
          dateAnchor: (datetimeObject),
        });
      },
    );
  }

  onClickPreviousWeek = () => {
    const { dateAnchor } = this.state;
    this.getDataByDateAnchor(new Date(dateAnchor.setDate(dateAnchor.getDate() - 7)));
  }

  onClickNextWeek = () => {
    const { dateAnchor } = this.state;
    this.getDataByDateAnchor(new Date(dateAnchor.setDate(dateAnchor.getDate() + 7)));
  }

  renderTableContent = (currentWorkstationNum, dateInfo, startTime, endTime) => (
    <TableContent
      shopId={this.props.user.shop_id}
      currentWorkstationNum={currentWorkstationNum}
      workstationNumSelectors={this.state.workstationNumSelectors}
      dateInfo={dateInfo}
      startTime={startTime}
      endTime={endTime}
    />
  )

  render() {
    const { apiFetched, data, dateStrArray } = this.state;

    return (
      <MainLayout padding={0}>
        <div
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderBottom: '1px solid #DFDFDF',
          }}
        >
          <VerifyPermission
            perform="workstation:update"
            yes={() => (<div>顯示當前工位數量，僅可修改明日以後之工位數量</div>
            )}
            no={() => (<div>顯示當前工位數量</div>)}
          />
        </div>
        {
          !apiFetched ? <CircularProgress style={{ marginTop: 10 }} />
            : (
              <WeekTable
                dateStrArray={dateStrArray}
                data={data}
                renderContent={this.renderTableContent}
                onClickPreviousWeek={this.onClickPreviousWeek}
                onClickNextWeek={this.onClickNextWeek}
              />
            )
        }
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

export default connect(mapStateToProps)(DailyDurationWorkstation);
