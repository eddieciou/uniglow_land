import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import userActions from '../../actions/user.actions';
import authSelectors from '../../selectors/auth.selectors';
import ArocebLogoImage from '../../assets/img/aroceb_logo.png';
import uniglowLandLogoImage from '../../assets/img/uniglow_land_logo.png';

class LoginPage extends Component {
  state = {
    account: '',
    password: '',
    rememberUser: false,
    forgetPassword: false,
  }

  componentDidMount() {
    this.props.dispatch(userActions.logout());
    const userAccount = localStorage.getItem('userAccount');
    if (userAccount) {
      this.setState({
        account: userAccount,
        rememberUser: true,
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { account, password, rememberUser } = this.state;
    const { dispatch } = this.props;
    if (account && password) {
      this.setState({
        password: '',
      });
      dispatch(userActions.login(account, password, rememberUser));
    }
  }

  render() {
    const { classes } = this.props;
    const { loggingIn } = this.props;
    const {
      account, password, rememberUser, forgetPassword,
    } = this.state;

    return (
      <div className={classes.background}>
        <div className={classes.logoContent}>
          <img alt="arocebLogo" src={ArocebLogoImage} className={classes.logoImg} />
          <div className={classes.logoDivider}>X</div>
          <img alt="uniglowLandLogo" src={uniglowLandLogoImage} className={classes.logoImg} />
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div
              className={classes.logoText}
            >
              摯善美學庫存管理系統
            </div>
            <form name="form" onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="帳號"
                name="account"
                autoComplete="account"
                value={account}
                onChange={this.handleChange}
                autoFocus={localStorage.getItem('userAccount') === null}
                className={classes.text}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="密碼"
                type="password"
                value={password}
                autoFocus={localStorage.getItem('userAccount') !== null}
                onChange={this.handleChange}
                autoComplete="current-password"
                className={classes.text}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 15,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    color: 'black',
                  }}
                >
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={rememberUser}
                        onChange={() => { this.setState({ rememberUser: !rememberUser }); }}

                      />
                     )}
                    style={{ marginRight: 10, color: 'grey' }}
                    label="記住帳號"
                  />
                </div>

                <Button
                  style={{
                    float: 'right',
                    color: 'grey',
                    fontSize: 15,
                  }}
                  onClick={() => { this.setState({ forgetPassword: true }); }}
                >
                  忘記密碼?
                </Button>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                endIcon={(loggingIn && <CircularProgress size={15} />)}
              >
                登入
              </Button>
            </form>
          </div>
        </Container>
        <Dialog
          open={forgetPassword}
          onClose={() => { this.setState({ forgetPassword: false }); }}
          PaperProps={{
            style: {
              maxWidth: 400,
              backgroundColor: 'rgba(39,154,131,0.9)',
              paddingTop: 20,
              paddingBottom: 20,
            },
          }}
        >
          <DialogTitle>忘記密碼？</DialogTitle>
          <DialogContent
            style={{
              fontSize: 16,
            }}
          >
            若您忘記您的密碼，請聯絡管理員協助您重新設定您的密碼，謝謝。
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const styles = (theme) => ({
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: 'rgba(253,100,122,0.89)',
    height: '50px',
  },
  text: {
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: 'white',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  logoText: {
    marginTop: '10px',
    marginBottom: '10px',
    color: 'grey',
    fontSize: '25px',
  },
  logoContent: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoDivider: {
    fontSize: 40,
    marginLeft: 20,
    marginRight: 20,
    color: 'lightgrey',
  },
  logoImg: {
    width: '20%',
  },
});

const styleWithLoginPage = withStyles(styles)(LoginPage);

const mapStateToProps = (state) => ({
  loggingIn: authSelectors.getLoggingIn(state),
});

export default connect(mapStateToProps)(styleWithLoginPage);
