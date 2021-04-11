import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import MainLayout from '../../MainLayout/MainLayout';
import Table from '../../../components/Table/Table';
import { get } from '../../../services/reservation.service';

class RoleManagePage extends Component {
  state = {
    apiFetched: false,
    roles: [],
  }

  componentDidMount() {
    get('/roles').then((data) => {
      this.setState({ roles: data.result, apiFetched: true });
    });
  }

  renderTableOperation = (rowData) => (
    <>
      <IconButton
        onClick={() => { window.location.href = `/reservation/admin/role_manage/edit/${rowData.id}`; }}
      >
        <CreateIcon style={{ color: '#e28615' }} />
      </IconButton>
    </>
  )

  render() {
    const { apiFetched, roles } = this.state;

    return (
      <MainLayout>
        <h1>
          角色管理
        </h1>
        {
          !apiFetched ? <CircularProgress />
            : (
              <Table
                data={roles}
                columns={[
                  { title: 'ID', field: 'id' },
                  { title: '角色名稱', field: 'name' },
                  { title: '描述', field: 'description' },
                  { title: '操作', field: 'id', render: this.renderTableOperation },
                ]}
                addDataButton={{
                  name: '新增角色',
                  handleClickAdd: () => { window.location.href = '/reservation/admin/role_manage/create'; },
                  icon: <AddIcon />,
                }}
              />
            )
        }
      </MainLayout>
    );
  }
}

export default RoleManagePage;
