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
import PermissionCheckBox from '../RoleManagePage/PermissionCheckBox';
import { post, get, patch } from '../../../services/reservation.service';

class CreateAPIKeyPage extends Component {
  state = {
    apiKeyId: this.props.match.params.apiKeyId,
    apiFetched: false,
    apiPosting: false,
    description: '',
    apiKey: '',
    prefix: '',
    permissionChecked: {},
    permissions: [],
  }

  componentDidMount() {
    const { apiKeyId } = this.state;

    get('/permissions').then(
      (data) => {
        const permissions = data.result.map((part) => (
          {
            value: part.id,
            title: part.display_name,
            scope: part.scope,
            description: part.description,
          }));

        if (apiKeyId) {
          get(`/api_keys/${apiKeyId}`).then((result) => {
            const { description, prefix } = result;
            this.setState({
              prefix,
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

  onClickGenAPIKey = () => {
    const { description, permissionChecked } = this.state;
    const body = {
      description,
      permissions: Object.keys(permissionChecked).filter((part) => permissionChecked[part]),
    };
    post('/api_keys', body).then(
      (result) => {
        const { api_key_id: apiKeyId, api_key: apiKey } = result;
        this.setState({
          apiKeyId,
          apiKey,
        });
      },
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ apiPosting: true });
    const { description, permissionChecked, apiKeyId } = this.state;
    patch(`/api_keys/${apiKeyId}`, {
      description,
      permissions: Object.keys(permissionChecked).filter((part) => permissionChecked[part]),
    }).then(
      (result) => {
        if (result.success) {
          window.location.href = '/reservation/admin/api_key_manage/show';
        }
      },
    );
  }

  render() {
    const {
      apiKey, description, apiPosting, apiKeyId, apiFetched, permissions, permissionChecked, prefix,
    } = this.state;

    const { apiKeyId: propApiKeyId } = this.props.match.params;

    return (
      <MainLayout>
        <div style={{ marginTop: 8 }}>
          <IconButton
            onClick={() => { window.location.href = '/reservation/admin/api_key_manage/show'; }}
            style={{ verticalAlign: 'middle', color: '#62c0b3', marginLeft: -20 }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>{`${propApiKeyId ? '編輯' : '新增'}API Key`}</h1>
        </div>

        {
          apiKeyId && !apiFetched ? <CircularProgress />
            : (
              <Card>
                <CardBody>
                  <form onSubmit={this.onSubmit}>
                    {
                      propApiKeyId && (
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              value={prefix}
                              id="prefix"
                              label="Prefix"
                              margin="dense"
                              type="text"
                              variant="outlined"
                              disabled
                              fullWidth
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
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
                      permissionChecked={permissionChecked}
                      permissions={permissions}
                      onChange={(result) => { this.setState({ permissionChecked: result }); }}
                      disabled={apiPosting}
                    />

                    {
                      !propApiKeyId && (
                        <GridContainer style={{ paddingTop: 20 }}>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              onChange={(e) => { this.setState({ description: e.target.value }); }}
                              value={apiKey === '' ? '點擊產生API Key' : apiKey}
                              id="apiKey"
                              label={apiKey !== '' && 'API Key'}
                              margin="dense"
                              type="text"
                              variant="outlined"
                              disabled
                              fullWidth
                            />
                          </GridItem>
                          {
                            (apiKey === '') && (
                              <GridItem xs={12} sm={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                  onClick={this.onClickGenAPIKey}
                                  variant="contained"
                                  style={{
                                    width: '70%',
                                    height: '70%',
                                    backgroundColor: `${apiPosting ? 'grey' : '#229a34'}`,
                                    color: 'white',
                                  }}
                                  disabled={apiPosting}
                                >
                                  產生API Key
                                </Button>
                              </GridItem>
                            )
                          }
                        </GridContainer>
                      )
                    }

                    <GridContainer style={{ paddingTop: 20 }}>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{
                            width: '100%',
                            backgroundColor: `${apiPosting || !apiKeyId ? 'grey' : '#1989d9'}`,
                            color: 'white',
                          }}
                          disabled={apiPosting || !apiKeyId}
                        >
                          {propApiKeyId ? '儲存' : '新增'}
                        </Button>
                      </GridItem>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          variant="contained"
                          onClick={() => { window.location.href = '/reservation/admin/api_key_manage/show'; }}
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

export default CreateAPIKeyPage;
