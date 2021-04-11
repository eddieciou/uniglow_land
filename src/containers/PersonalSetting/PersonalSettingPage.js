import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import authSelectors from '../../selectors/auth.selectors';
import MainLayout from '../MainLayout/MainLayout';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import userActions from '../../actions/user.actions';

class PersonalSettingPage extends Component {
  state={
    name: this.props.user.name,
  }

  onClickSubmit = () => {
    const { name } = this.state;
    const { dispatch } = this.props;

    dispatch(userActions.updatePersonalSetting({ name }));
  }

  render() {
    const { user, apiPosting } = this.props;
    const { name } = this.state;

    return (
      <MainLayout>
        <h1>修改使用者資料</h1>
        <Card style={{ marginTop: 1 }}>
          <CardBody>
            <TextField
              value={user.account}
              label="使用者帳號"
              margin="dense"
              type="text"
              variant="outlined"
              disabled
            />
          </CardBody>
          <CardBody style={{ marginTop: -20 }}>
            <TextField
              value={user.role}
              label="角色"
              margin="dense"
              type="text"
              variant="outlined"
              disabled
            />
          </CardBody>
          <CardBody style={{ marginTop: -20 }}>
            <TextField
              value={name}
              onChange={(e) => { this.setState({ name: e.target.value }); }}
              label="顯示名稱"
              margin="dense"
              type="text"
              variant="outlined"
              disabled={apiPosting}
            />
          </CardBody>

          <CardBody style={{ marginTop: -10 }}>
            { name !== this.props.user.name
            && (
            <Button
              onClick={this.onClickSubmit}
              variant="contained"
              style={{
                backgroundColor: apiPosting ? '#dde5e4' : '#1db898',
                color: 'white',
              }}
              disabled={apiPosting}
            >
              {apiPosting ? <CircularProgress size={30} style={{ color: 'grey', padding: 1 }} /> : '儲存修改'}
            </Button>
            )}
          </CardBody>

        </Card>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
  apiPosting: authSelectors.getAPIPosting(state),
});

export default connect(mapStateToProps)(PersonalSettingPage);
