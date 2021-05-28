import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MainLayout from '../MainLayout/MainLayout';
import { get } from '../../services/reservation.service';
import Table from '../../components/Table/Table';
import UploadProductModal from './UploadProductModal';

class ProductPage extends Component {
  state = {
    band: this.props.match.params.band,
    products: [],
    singleProducts: {},
    fetched: false,
    openUploadProduct: false,
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
      this.getInitDataPromise(`/${this.state.band}/products`),
      this.getInitDataPromise(`/${this.state.band}/single_products`),
    ]).then(([products, singleProducts]) => {
      this.setState({
        fetched: true,
        singleProducts,
        products,
      });
    });
  }

  handleOpenUploadProduct = () => this.setState({ openUploadProduct: true })

  render() {
    const {
      band, products, singleProducts, fetched, openUploadProduct,
    } = this.state;

    return (
      <MainLayout band={band}>
        <UploadProductModal
          band={band}
          open={openUploadProduct}
          onClose={() => { this.setState({ openUploadProduct: false }); }}
          onSuccess={(result) => {
            this.setState({
              openUploadProduct: false,
              products: [...products, ...result],
            });
          }}
        />
        <h1>
          商品列表
        </h1>
        {!fetched
          ? <CircularProgress />
          : (
            <Table
              options={{ pageSize: 10 }}
              data={products}
              columns={[
                { title: '商品編號', field: 'product_number' },
                { title: '商品名稱', field: 'product_name' },
                { title: '建立時間', field: 'create_datetime' },
              ]}
              addDataButton={{
                name: '新增商品',
                icon: <AddBoxIcon />,
                handleClickAdd: this.handleOpenUploadProduct,
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
                    商品內容
                  </div>
                  {
                      Object.keys(rowData.product_content).map((part) => (
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
                            {rowData.product_content[part]}
                          </div>
                        </div>
                      ))
                    }
                </div>
              )}
            />
          )}
      </MainLayout>
    );
  }
}

export default ProductPage;
