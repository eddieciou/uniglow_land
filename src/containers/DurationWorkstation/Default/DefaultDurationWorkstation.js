import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../../MainLayout/MainLayout';
import authSelectors from '../../../selectors/auth.selectors';
import TotalWorkstation from './TotalWorkstation';
import { get, post } from '../../../services/reservation.service';
import DefaultWorkstation from './DefaultWorkstation';
import HoleDayDefaultWorkstation from './HoleDayDefaultWorkstation';

class DefaultDurationWorkstation extends Component {
  state = {
    workstationNum: undefined,
    defaultWorkStations: undefined,
    apiFetched: false,
    apiPosting: false,
  }

  componentDidMount() {
    const { shop_id: shopId } = this.props.user;
    Promise.all([
      get(`/shops/${shopId}/workstation`),
      get(`/shops/${shopId}/default_shop_duration_workstation`),
    ]).then(([workstationNum, defaultWorkStations]) => {
      this.setState({
        apiFetched: true,
        workstationNum: workstationNum.workstation_num,
        defaultWorkStations: defaultWorkStations.result,
      });
    });
  }

  onChangeTotalWorkstationNum = (value) => {
    this.setState({ apiPosting: true });
    post(`/shops/${this.props.user.shop_id}/workstation`, { workstation_num: value }).then(
      (result) => {
        if (result.success) {
          this.setState({
            apiPosting: false,
            workstationNum: value,
          });
        }
      },
    );
  }

  onChangeDefaultWorkstationNum = (startTime, endTime, workstationNum) => {
    this.setState({ apiPosting: true });
    const body = {
      start_time: startTime,
      end_time: endTime,
      workstation_num: workstationNum,
    };
    post(`/shops/${this.props.user.shop_id}/default_shop_duration_workstation`, body).then(
      (result) => {
        if (result.success) {
          const { defaultWorkStations } = this.state;
          const newDefaultWorkStations = defaultWorkStations.map(
            (part) => {
              if (part.start_time === startTime) {
                return { ...part, workstation_num: workstationNum };
              }
              return { ...part };
            },
          );
          this.setState({ apiPosting: false, defaultWorkStations: newDefaultWorkStations });
        }
      },
    );
  }

  onChangeHoleDayDefaultWorkstationNum = (workstationNum) => {
    const { defaultWorkStations } = this.state;
    const startTime = defaultWorkStations[0].start_time;
    const endTime = defaultWorkStations.slice(-1)[0].end_time;
    const body = {
      start_time: startTime,
      end_time: endTime,
      workstation_num: workstationNum,
    };

    post(`/shops/${this.props.user.shop_id}/default_shop_duration_workstation`, body).then(
      (result) => {
        if (result.success) {
          window.location.href = '/reservation/duration_workstation/default/setting';
        }
      },
    );
  }

  render() {
    const {
      apiFetched, apiPosting, workstationNum, defaultWorkStations,
    } = this.state;
    return (
      <MainLayout padding={0}>
        {
          !apiFetched || apiPosting ? <CircularProgress />
            : (
              <>
                <div style={{ padding: 10 }}>
                  此區為設定開放工位數量預設值及總工位設定。
                </div>

                <TotalWorkstation
                  workstationNum={workstationNum}
                  onChange={this.onChangeTotalWorkstationNum}
                />

                <HoleDayDefaultWorkstation
                  workstationNum={workstationNum}
                  onChange={this.onChangeHoleDayDefaultWorkstationNum}
                />
                {
                  defaultWorkStations
                  && (
                  <DefaultWorkstation
                    workstationNum={workstationNum}
                    defaultWorkstations={defaultWorkStations}
                    onChangeDurationWorkstationNum={this.onChangeDefaultWorkstationNum}
                  />
                  )
                }
              </>
            )
        }
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

export default connect(mapStateToProps)(DefaultDurationWorkstation);
