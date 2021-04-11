import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from '../MainLayout/MainLayout';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import { post } from '../../services/reservation.service';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [apiPosting, setAPIPosting] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== checkPassword) {
      setPasswordErrorMessage('密碼不一致, 請重新確認');
    } else {
      setAPIPosting(true);
      post('/reset_password', { new_password: newPassword }).then(
        (result) => {
          if (result.success) {
            window.location.href = '/reservation/login';
          }
        },
      );
    }
  };

  return (
    <MainLayout>
      <h1>更換密碼</h1>
      <Card style={{ marginTop: 1 }}>
        <form onSubmit={onSubmit}>
          <CardBody>
            <TextField
              style={{ width: '20%' }}
              error={Boolean(passwordErrorMessage)}
              helperText={passwordErrorMessage}
              required
              autoFocus
              value={newPassword}
              label="請輸入新密碼"
              margin="dense"
              type={passwordVisible ? 'text' : 'password'}
              variant="outlined"
              onChange={(e) => {
                setPasswordErrorMessage('');
                setNewPassword(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => { setPasswordVisible(!passwordVisible); }}
                    style={{ padding: 0 }}
                  >
                    {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>),
              }}
            />
          </CardBody>
          <CardBody style={{ marginTop: -20 }}>
            <TextField
              style={{ width: '20%' }}
              required
              value={checkPassword}
              label="確認密碼新密碼"
              margin="dense"
              type={passwordVisible ? 'text' : 'password'}
              variant="outlined"
              onChange={(e) => {
                setPasswordErrorMessage('');
                setCheckPassword(e.target.value);
              }}
            />
          </CardBody>
          <CardBody style={{ marginTop: -10 }}>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: `${apiPosting ? '#dde5e4' : '#1db898'}`,
                color: 'white',
              }}
              disabled={apiPosting}
            >
              {apiPosting ? <CircularProgress size={30} style={{ color: 'grey', padding: 1 }} /> : '確認更換'}
            </Button>
          </CardBody>
        </form>
      </Card>
    </MainLayout>
  );
};

export default ResetPasswordPage;
