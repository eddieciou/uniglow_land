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
import { post, get, patch } from '../../../services/reservation.service';

class CreatePermissionPage extends Component {
  state = {
    permissionId: this.props.match.params.permissionId,
    apiFetched: false,
    apiPosting: false,
    scope: '',
    displayName: '',
    description: '',
  }

  componentDidMount() {
    const { permissionId } = this.state;
    if (permissionId) {
      get(`/permissions/${permissionId}`).then(
        (result) => {
          this.setState({
            scope: result.scope,
            description: result.description,
            displayName: result.display_name,
            apiFetched: true,
          });
        },
      );
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      scope, description, permissionId, displayName,
    } = this.state;
    this.setState({ apiPosting: true });

    const body = {
      scope: permissionId ? undefined : scope,
      display_name: displayName,
      description,
    };

    const apiQuery = permissionId ? patch(`/permissions/${permissionId}`, body)
      : post('/permissions', body);

    apiQuery.then(
      (result) => {
        if (result.success) {
          window.location.href = '/reservation/admin/permission_manage/show';
        }
      },
    );
  }

  render() {
    const {
      scope, description, apiPosting, permissionId, apiFetched, displayName,
    } = this.state;

    return (
      <MainLayout>
        <div style={{ marginTop: 8 }}>
          <IconButton
            onClick={() => { window.location.href = '/reservation/admin/permission_manage/show'; }}
            style={{ verticalAlign: 'middle', color: '#62c0b3', marginLeft: -20 }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>{`${permissionId ? '編輯' : '新增'}權限`}</h1>
        </div>

        {
          permissionId && !apiFetched ? <CircularProgress />
            : (
              <Card>
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          onChange={(e) => { this.setState({ scope: e.target.value }); }}
                          value={scope}
                          id="scope"
                          label="權限"
                          margin="dense"
                          type="text"
                          variant="outlined"
                          disabled={apiPosting || Boolean(permissionId)}
                          fullWidth
                          required
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          onChange={(e) => { this.setState({ displayName: e.target.value }); }}
                          value={displayName}
                          id="displayName"
                          label="顯示名稱"
                          margin="dense"
                          type="text"
                          variant="outlined"
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
                          {permissionId ? '儲存' : '新增'}
                        </Button>
                      </GridItem>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          onClick={() => { window.location.href = '/reservation/admin/permission_manage/show'; }}
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

export default CreatePermissionPage;
