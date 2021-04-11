import React, { Component } from 'react';
import MainLayout from '../MainLayout/MainLayout';

class ProductPage extends Component {
  state = {
    band: this.props.match.params.band,
  }

  render() {
    const { band } = this.state;

    return (
      <MainLayout band={band}>
        <div>
          Product Page {band}
        </div>
      </MainLayout>
    );
  }
}

export default ProductPage;
