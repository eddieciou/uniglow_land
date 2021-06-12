import React, { Component } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../MainLayout/MainLayout';
import Table from '../../components/Table/Table';
import UploadSaleRecordModal from './UploadSaleRecordModal';
import { get } from '../../services/reservation.service';

class SaleRecordPage extends Component {
  state = {
    band: this.props.match.params.band,
    openUploadSaleRecord: false,
    saleRecord: [{
      sale_number: '',
      single_products: {},
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
      this.getInitDataPromise(`/${this.state.band}/sale_record`),
      this.getInitDataPromise(`/${this.state.band}/single_products`),
    ]).then(([saleRecord, singleProducts]) => {
      this.setState({
        fetched: true,
        singleProducts,
        saleRecord,
      });
    });
  }

  handleOpenUploadSaleRecord = () => this.setState({ openUploadSaleRecord: true })

  render() {
    const {
      band, openUploadSaleRecord, saleRecord, singleProducts, fetched,
    } = this.state;

    return (
      <MainLayout band={band}>
        <UploadSaleRecordModal
          open={openUploadSaleRecord}
          band={band}
          onClose={() => { this.setState({ openUploadSaleRecord: false }); }}
          onSuccess={(result) => {
            this.setState({
              openUploadSaleRecord: false,
              saleRecord: [result, ...saleRecord],
            });
          }}
        />
        <h1>銷售紀錄</h1>
        {
          !fetched
            ? <CircularProgress />
            : (
              <Table
                data={saleRecord}
                columns={[
                  { title: '銷售單號', field: 'sale_number' },
                  { title: '銷售單建立時間', field: 'create_datetime' },
                ]}
                addDataButton={{
                  name: '匯入銷售紀錄',
                  icon: <PostAddIcon />,
                  handleClickAdd: this.handleOpenUploadSaleRecord,
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
                      內容
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

export default SaleRecordPage;
