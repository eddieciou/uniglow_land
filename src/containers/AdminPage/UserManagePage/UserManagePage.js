import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import MainLayout from '../../MainLayout/MainLayout';
import Table from '../../../components/Table/Table';
import { get, post } from '../../../services/reservation.service';
import CommonModal from '../../../components/Modal/CommonModal';

class UserManagePage extends Component {
  state = {
    apiQuerying: true,
    users: [],
    userToResetPassword: undefined,
  }

  componentDidMount() {
    get('/users').then(
      (data) => {
        this.setState({ users: data.result, apiQuerying: false });
      },
    );
  }

  renderTableOperation = (rowData) => (
    rowData.shopName && (
      <IconButton
        onClick={() => { this.setState({ userToResetPassword: { name: rowData.name, id: rowData.id } }); }}
      >
        <VpnKeyIcon style={{ color: '#af3030' }} />
      </IconButton>
    )
  )

  handleSubmitResetPassword = (e) => {
    e.preventDefault();
    this.setState({ apiQuerying: true });
    const { id, password } = this.state.userToResetPassword;
    post(`/users/${id}/reset_password`, { new_password: password }).then(
      () => {
        this.setState({ userToResetPassword: undefined, apiQuerying: false });
      },
    );
  }

  render() {
    const { apiQuerying, users, userToResetPassword } = this.state;

    return (
      <MainLayout>
        <h1>
          使用者列表
        </h1>
        {
          !userToResetPassword && apiQuerying ? <CircularProgress />
            : (
              <Table
                data={users}
                columns={[
                  { title: 'ID', field: 'id' },
                  { title: '帳號', field: 'account' },
                  { title: '名稱', field: 'name' },
                  { title: '角色', field: 'roleName' },
                  {
                    title: '店家',
                    field: 'shopName',
                    render: (rowData) => (rowData.shopName === '' ? '無' : rowData.shopName),
                  },
                  { title: '最後登入時間', field: 'lastLoginTime' },
                  { title: '操作', field: 'id', render: this.renderTableOperation },
                ]}
                addDataButton={{
                  name: '新增使用者',
                  handleClickAdd: () => { window.location.href = '/reservation/admin/user_manage/create'; },
                  icon: <AddIcon />,
                }}
              />
            )
        }
        {
          Boolean(userToResetPassword)
          && (
          <CommonModal
            title={`修改帳號 ${userToResetPassword.name} 之密碼`}
            description={`此操作確認修改後將直接修改 ${userToResetPassword.name} 之密碼`}
            handelCancel={() => { this.setState({ userToResetPassword: undefined }); }}
            open={Boolean(userToResetPassword)}
            isLoading={apiQuerying}
            handleSubmit={this.handleSubmitResetPassword}
            submitText="確認修改"
            content={(isLoading) => (
              <div style={{ marginBottom: 20 }}>
                <TextField
                  autoFocus
                  onChange={(e) => {
                    this.setState({ userToResetPassword: { ...userToResetPassword, password: e.target.value } });
                  }}
                  value={userToResetPassword.password}
                  margin="dense"
                  label="新密碼"
                  type="text"
                  fullWidth
                  required
                  disabled={isLoading}
                />
              </div>
            )}
          />
          )
        }
      </MainLayout>
    );
  }
}

export default UserManagePage;
