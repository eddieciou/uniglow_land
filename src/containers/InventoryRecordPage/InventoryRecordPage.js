import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../MainLayout/MainLayout';
import { get } from '../../services/reservation.service';
import Table from '../../components/Table/Table';
import { inventoryCodeNameMap } from '../../constants/constants';

class InventoryRecordPage extends Component {
  state = {
    band: this.props.match.params.band,
    inventoryRecord: [{
      inventory_number: '',
      inventory_code: 1,
      products: {},
      create_datetime: '',
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
      this.getInitDataPromise(`/${this.state.band}/inventory_record`),
      this.getInitDataPromise(`/${this.state.band}/single_products`),
    ]).then(([inventoryRecord, singleProducts]) => {
      this.setState({
        fetched: true,
        singleProducts,
        inventoryRecord,
      });
    });
  }

  render() {
    const {
      band, fetched, singleProducts, inventoryRecord,
    } = this.state;

    return (
      <MainLayout band={band}>
        <h1>入/出庫紀錄</h1>
        {
          !fetched
            ? <CircularProgress />
            : (
              <Table
                data={inventoryRecord}
                columns={[
                  { title: '單號', field: 'inventory_number' },
                  {
                    title: '異動原因',
                    field: 'inventory_code',
                    render: (rowData) => inventoryCodeNameMap[rowData.inventory_code],
                  },
                  { title: '建立時間', field: 'create_datetime' },
                ]}
                detail={(rowData) => (
                  <div
                    style={{
                      marginLeft: '5%',
                      color: 'rgba(253,100,122,0.89)',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      內容
                    </div>
                    {
                      Object.keys(rowData.products).map((part) => (
                        <div
                          key={part}
                          style={{
                            marginLeft: '5%',
                            color: 'grey',
                            display: 'flex',
                          }}
                        >
                          {singleProducts[part]}
                          <div
                            style={{
                              marginLeft: '10px',
                              color: 'rgba(253,100,122,0.89)',
                            }}
                          >
                            X
                            {' '}
                            {rowData.products[part]}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default InventoryRecordPage;
