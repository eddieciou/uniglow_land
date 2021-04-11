import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../../MainLayout/MainLayout';
import Table from '../../../components/Table/Table';
import { get } from '../../../services/reservation.service';

class ShopManagePage extends Component {
  state = {
    apiFetched: false,
    shops: [],
  }

  componentDidMount() {
    get('/shops').then(
      (data) => {
        this.setState({ shops: data.result, apiFetched: true });
      },
    );
  }

  render() {
    const { apiFetched, shops } = this.state;

    return (
      <MainLayout>
        <h1>
          店家列表
        </h1>
        {
          !apiFetched ? <CircularProgress />
            : (
              <Table
                data={shops}
                columns={[
                  { title: 'ID', field: 'shop_id' },
                  { title: '店名', field: 'name' },
                ]}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default ShopManagePage;
