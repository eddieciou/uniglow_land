import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../MainLayout/MainLayout';
import { get } from '../../services/reservation.service';
import Table from '../../components/Table/Table';

class InventoryPage extends Component {
  state ={
    band: this.props.match.params.band,
    inventory: [{
      product_number: '',
      quantity: 0,
      update_datetime: undefined,
    }],
    singleProducts: {},
    fetched: false,
  }

  getInitDataPromise = (url) => new Promise(
    (resolve, reject) => {
      get(url).then(
        (data) => { resolve(data.result); },
      ).catch(
        (err) => { reject(err); },
      );
    },
  )

  componentDidMount() {
    Promise.all([
      this.getInitDataPromise(`/${this.state.band}/inventory`),
      this.getInitDataPromise(`/${this.state.band}/single_products`),
    ]).then(([inventory, singleProducts]) => {
      this.setState({
        fetched: true,
        singleProducts,
        inventory,
      });
    });
  }

  render() {
    const {
      band, inventory, fetched, singleProducts,
    } = this.state;

    return (
      <MainLayout band={band}>
        <h1>
          商品庫存
        </h1>
        {
          !fetched
            ? <CircularProgress />
            : (
              <Table
                data={inventory}
                columns={[
                  {
                    title: '商品名稱',
                    field: 'product_number',
                    render: (rowData) => singleProducts[rowData.product_number],
                  },
                  { title: '數量', field: 'quantity' },
                  { title: '最新異動時間', field: 'update_datetime' },
                ]}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default InventoryPage;
