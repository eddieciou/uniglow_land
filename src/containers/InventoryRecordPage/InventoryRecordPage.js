import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MainLayout from '../MainLayout/MainLayout';
import { get } from '../../services/reservation.service';
import Table from '../../components/Table/Table';
import { inventoryCodeNameMap } from '../../constants/constants';
import UploadInventoryModal from './UploadInventoryModal';

class InventoryRecordPage extends Component {
  state = {
    band: this.props.match.params.band,
    inventoryRecord: [{
      inventory_number: '',
      inventory_code: 1,
      products: {},
      create_datetime: '',
    }],
    openUploadInventory: false,
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

  handOpenUploadInventory = () => this.setState({ openUploadInventory: true })

  render() {
    const {
      band, fetched, singleProducts, inventoryRecord, openUploadInventory,
    } = this.state;

    return (
      <MainLayout band={band}>
        {
          openUploadInventory && (
          <UploadInventoryModal
            band={band}
            open={openUploadInventory}
            onClose={() => { this.setState({ openUploadInventory: false }); }}
            onSuccess={(result) => {
              this.setState({
                openUploadInventory: false,
                inventoryRecord: [result, ...inventoryRecord],
              });
            }}
          />
          )
        }
        <h1>???/????????????</h1>
        {
          !fetched
            ? <CircularProgress />
            : (
              <Table
                data={inventoryRecord}
                columns={[
                  { title: '??????', field: 'inventory_number' },
                  {
                    title: '????????????',
                    field: 'inventory_code',
                    render: (rowData) => inventoryCodeNameMap[rowData.inventory_code],
                  },
                  { title: '????????????', field: 'create_datetime' },
                ]}
                addDataButton={{
                  name: '?????????/??????',
                  icon: <LocalShippingIcon />,
                  handleClickAdd: this.handOpenUploadInventory,
                }}
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
                      ??????
                    </div>
                    {
                      Object.keys(rowData.single_products).map((part) => (
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
                            {rowData.single_products[part]}
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
