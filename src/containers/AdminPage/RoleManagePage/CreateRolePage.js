import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../../MainLayout/MainLayout';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import PermissionCheckBox from './PermissionCheckBox';
import { post, get, patch } from '../../../services/reservation.service';

class CreateRolePage extends Component {
  state = {
    roleId: this.props.match.params.roleId,
    apiFetched: false,
    apiPosting: false,
    name: '',
    description: '',
    permissionChecked: {},
    permissions: [],
  }

  componentDidMount() {
    const { roleId } = this.state;

    get('/permissions').then(
      (data) => {
        const permissions = data.result.map((part) => (
          {
            value: part.id,
            title: part.display_name,
            scope: part.scope,
            description: part.description,
          }));

        if (roleId) {
          get(`/roles/${roleId}`).then((result) => {
            const { name, description } = result;
            this.setState({
              name,
              description,
              permissions,
              apiFetched: true,
              permissionChecked: result.permissions.reduce(
                (accumulator, part) => ({ ...accumulator, [part]: true }), {},
              ),
            });
          });
        } else {
          this.setState({ permissions, apiFetched: true });
        }
      },
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ apiPosting: true });
    const {
      name, description, permissionChecked, roleId,
    } = this.state;
    const body = {
      name,
      description,
      permissions: Object.keys(permissionChecked).filter((part) => permissionChecked[part]),
    };

    const apiQuery = roleId ? patch(`/roles/${roleId}`, body) : post('/roles', body);
    apiQuery.then(
      (result) => { if (result.success) { window.location.href = '/reservation/admin/role_manage/show'; } },
    );
  }

  render() {
    const {
      name, description, apiPosting, roleId, apiFetched, permissions, permissionChecked,
    } = this.state;

    return (
      <MainLayout>
        <div style={{ marginTop: 8 }}>
          <IconButton
            onClick={() => { window.location.href = '/reservation/admin/role_manage/show'; }}
            style={{ verticalAlign: 'middle', color: '#62c0b3', marginLeft: -20 }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>{`${roleId ? '編輯' : '新增'}角色`}</h1>
        </div>

        {
          roleId && !apiFetched ? <CircularProgress />
            : (
              <Card>
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          onChange={(e) => { this.setState({ name: e.target.value }); }}
                          value={name}
                          id="scope"
                          label="角色名稱"
                          margin="dense"
                          type="text"
                          variant="outlined"
                          disabled={apiPosting || Boolean(roleId)}
                          fullWidth
                          required
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          onChange={(e) => { this.setState({ description: e.target.value }); }}
                          value={description}
                          id="description"
                          label="描述"
                          margin="dense"
                          type="text"
                          variant="outlined"
                          disabled={apiPosting}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>

                    <PermissionCheckBox
                      defaultValue={permissionChecked}
                      permissions={permissions}
                      onChange={(result) => { this.setState({ permissionChecked: result }); }}
                      disabled={apiPosting}
                    />

                    <GridContainer style={{ paddingTop: 20 }}>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{
                            width: '100%',
                            backgroundColor: `${apiPosting ? 'grey' : '#1989d9'}`,
                            color: 'white',
                          }}
                          disabled={apiPosting}
                        >
                          {roleId ? '儲存' : '新增'}
                        </Button>
                      </GridItem>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          variant="contained"
                          onClick={() => { window.location.href = '/reservation/admin/role_manage/show'; }}
                          style={{
                            width: '100%',
                            backgroundColor: `${apiPosting ? 'grey' : '#c40c0c'}`,
                            color: 'white',
                          }}
                          disabled={apiPosting}
                        >
                          取消
                        </Button>
                      </GridItem>
                      {apiPosting && <CircularProgress style={{ padding: 10 }} />}
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            )
        }
      </MainLayout>
    );
  }
}

export default CreateRolePage;
