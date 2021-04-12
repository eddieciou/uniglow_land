import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../MainLayout/MainLayout';
import { get } from '../../services/reservation.service';
import Table from '../../components/Table/Table';

class ProductPage extends Component {
  state = {
    band: this.props.match.params.band,
    products: [],
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

  render() {
    const {
      band, products, singleProducts, fetched,
    } = this.state;

    return (
      <MainLayout band={band}>
        <h1>
          商品列表
        </h1>
        {!fetched
          ? <CircularProgress />
          : (
            <Table
              data={products}
              columns={[
                { title: '商品編號', field: 'product_number' },
                { title: '商品名稱', field: 'product_name' },
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
