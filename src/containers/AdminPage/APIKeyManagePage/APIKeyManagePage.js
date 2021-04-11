import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import MainLayout from '../../MainLayout/MainLayout';
import Table from '../../../components/Table/Table';
import { get } from '../../../services/reservation.service';

class APIKeyManagePage extends Component {
  state = {
    apiFetched: false,
    apiKeys: [],
  }

  componentDidMount() {
    get('/api_keys').then((data) => {
      this.setState({ apiKeys: data.result, apiFetched: true });
    });
  }

  renderTableOperation = (rowData) => (
    <>
      <IconButton
        onClick={() => { window.location.href = `/reservation/admin/api_key_manage/edit/${rowData.id}`; }}
      >
        <CreateIcon style={{ color: '#e28615' }} />
      </IconButton>
    </>
  )

  render() {
    const { apiFetched, apiKeys } = this.state;

    return (
      <MainLayout>
        <h1>
          API Key管理
        </h1>
        {
          !apiFetched ? <CircularProgress />
            : (
              <Table
                data={apiKeys}
                columns={[
                  { title: 'ID', field: 'id' },
                  { title: 'Prefix', field: 'prefix' },
                  { title: '描述', field: 'description' },
                  { title: '操作', field: 'id', render: this.renderTableOperation },
                ]}
                addDataButton={{
                  name: '新增 API Key',
                  handleClickAdd: () => { window.location.href = '/reservation/admin/api_key_manage/create'; },
                  icon: <AddIcon />,
                }}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default APIKeyManagePage;
