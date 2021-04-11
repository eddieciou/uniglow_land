import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MainLayout from '../../MainLayout/MainLayout';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import { get, post } from '../../../services/reservation.service';

class CreateUserPage extends Component {
  state = {
    userId: this.props.match.params.userId,
    apiFetched: false,
    apiPosting: false,
    account: '',
    accountError: false,
    name: '',
    password: '',
    checkPassword: '',
    checkPasswordError: false,
    passwordVisible: false,
    selectedRoleId: undefined,
    selectedShopId: undefined,
    roles: [],
    shops: [],
  }

  componentDidMount() {
    get('/roles').then(
      (getRoleResponse) => {
        get('/shops').then(
          (getShopResponse) => {
            const roles = getRoleResponse.result.filter((part) => !['總管理者', '系統管理者', '售服人員'].includes(part.name));
            const shops = getShopResponse.result.filter(
              (part) => !['AISXXX', 'AIS899', 'AIS014'].includes(part.shop_id),
            );

            this.setState({
              apiFetched: true,
              selectedRoleId: roles[0].id,
              shops,
              roles,
            });
          },
        );
      },
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      account, name, password, checkPassword, selectedRoleId, selectedShopId,
    } = this.state;

    if (password !== checkPassword) {
      this.setState({ checkPasswordError: true });
    } else {
      const body = {
        account: selectedShopId ? `${selectedShopId}-${account}` : account,
        name,
        password,
        role_id: selectedRoleId,
        shop_id: selectedShopId,
      };
      post('/register', body).then(
        (result) => {
          if (result.success) {
            window.location.href = '/reservation/admin/user_manage/show';
          }
        },
      ).catch(
        (error) => {
          if (error.status === 409) {
            this.setState({ accountError: true });
          }
        },
      );
    }
  }

  render() {
    const {
      account, name, apiPosting, userId, apiFetched, selectedRoleId, roles, shops,
      password, checkPassword, passwordVisible, selectedShopId, checkPasswordError, accountError,
    } = this.state;

    return (
      <MainLayout>
        <div style={{ marginTop: 8 }}>
          <IconButton
            onClick={() => { window.location.href = '/reservation/admin/user_manage/show'; }}
            style={{ verticalAlign: 'middle', color: '#62c0b3', marginLeft: -20 }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>{`${userId ? '編輯' : '新增'}使用者`}</h1>
        </div>

        {
          !apiFetched ? <CircularProgress />
            : (
              <Card>
                <CardBody>
                  <form onSubmit={this.onSubmit}>

                    <Typography style={{ marginTop: 10 }}>選擇角色</Typography>
                    <RadioGroup
                      row
                      aria-label="district"
                      name="district"
                      value={selectedRoleId}
                      onChange={(e) => { this.setState({ selectedRoleId: e.target.value }); }}
                    >
                      {
                        roles.map((elem) => (
                          <FormControlLabel
                            key={elem.id}
                            value={elem.id}
                            control={<Radio color="primary" />}
                            label={elem.name}
                            disabled={apiPosting}
                          />
                        ))
                      }
                    </RadioGroup>

                    <Typography style={{ marginTop: 10 }}>選擇店家</Typography>
                    <Autocomplete
                      id="combo-box-demo"
                      options={shops}
                      getOptionLabel={(option) => `[${option.shop_id}] ${option.name}`}
                      style={{ width: 300 }}
                      onChange={(e, value) => {
                        this.setState({ selectedShopId: value ? value.shop_id : undefined });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          margin="dense"
                          variant="outlined"
                        />
                      )}
                    />

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          onChange={(e) => { this.setState({ account: e.target.value, accountError: false }); }}
                          value={account}
                          id="account"
                          label="登入帳號"
                          margin="dense"
                          type="text"
                          variant="outlined"
                          disabled={apiPosting}
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: selectedShopId ? `${selectedShopId}-` : '',
                          }}
                          error={accountError}
                          helperText={accountError && '此帳號已被建立'}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          onChange={(e) => { this.setState({ name: e.target.value }); }}
                          value={name}
                          id="name"
                          label="顯示名稱"
                          margin="dense"
                          type="text"
                          variant="outlined"
                          fullWidth
                          disabled={apiPosting || Boolean(userId)}
                          required
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          onChange={(e) => { this.setState({ password: e.target.value, checkPasswordError: false }); }}
                          value={password}
                          id="password"
                          label="登入密碼"
                          margin="dense"
                          type={passwordVisible ? 'text' : 'password'}
                          variant="outlined"
                          disabled={apiPosting}
                          fullWidth
                          required
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() => { this.setState({ passwordVisible: !passwordVisible }); }}
                                style={{ padding: 0 }}
                              >
                                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>),
                          }}
                          error={checkPasswordError}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          onChange={(e) => {
                            this.setState({ checkPassword: e.target.value, checkPasswordError: false });
                          }}
                          value={checkPassword}
                          id="checkPassword"
                          label="確認密碼"
                          margin="dense"
                          type={passwordVisible ? 'text' : 'password'}
                          variant="outlined"
                          disabled={apiPosting}
                          required
                          fullWidth
                          error={checkPasswordError}
                          helperText={checkPasswordError && '確認密碼不一致，請確認'}
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
                          {userId ? '儲存' : '新增'}
                        </Button>
                      </GridItem>
                      <GridItem xs={6} sm={3} md={1}>
                        <Button
                          variant="contained"
                          onClick={() => { window.location.href = '/reservation/admin/user_manage/show'; }}
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

export default CreateUserPage;
