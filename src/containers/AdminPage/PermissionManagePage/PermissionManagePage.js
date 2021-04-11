import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import MainLayout from '../../MainLayout/MainLayout';
import Table from '../../../components/Table/Table';
import { get } from '../../../services/reservation.service';

class PermissionManagePage extends Component {
  state = {
    apiFetched: false,
    permissions: [],
  }

  componentDidMount() {
    get('/permissions').then((data) => {
      this.setState({ permissions: data.result, apiFetched: true });
    });
  }

  renderTableOperation = (rowData) => (
    <>
      <IconButton
        onClick={() => { window.location.href = `/reservation/admin/permission_manage/edit/${rowData.id}`; }}
      >
        <CreateIcon style={{ color: '#e28615' }} />
      </IconButton>
    </>
  )

  render() {
    const { apiFetched, permissions } = this.state;

    return (
      <MainLayout>
        <h1>
          權限管理
        </h1>
        {
          !apiFetched ? <CircularProgress />
            : (
              <Table
                data={permissions}
                columns={[
                  { title: 'ID', field: 'id' },
                  { title: '權限', field: 'scope' },
                  { title: '顯示名稱', field: 'display_name' },
                  { title: '描述', field: 'description' },
                  { title: '操作', field: 'id', render: this.renderTableOperation },
                ]}
                addDataButton={{
                  name: '新增權限',
                  handleClickAdd: () => { window.location.href = '/reservation/admin/permission_manage/create'; },
                  icon: <AddIcon />,
                }}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default PermissionManagePage;
