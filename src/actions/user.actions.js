import userConstants from '../constants/user.constants';
import { login as loginService, logout as logoutService, patch } from '../services/reservation.service';
import alertActions from './alert.actions';
import history from '../helpers/history';

function login(account, password, rememberUser) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ account }));

    loginService(account, password)
      .then(
        (user) => {
          dispatch(success(user));
          if (rememberUser) {
            localStorage.setItem('userAccount', account);
          } else {
            localStorage.removeItem('userAccount');
          }
          history.push('/aroceb/product');
        },
        (error) => {
          dispatch(failure(error.message));
          dispatch(alertActions.error(error.message));
        },
      );
  };
}

function logout() {
  logoutService();
  return { type: userConstants.LOGOUT };
}

const updatePersonalSetting = (personalSetting) => {
  const request = () => ({ type: userConstants.UPDATE_PERSONAL_SETTING_REQUEST });
  const success = (user) => ({ type: userConstants.UPDATE_PERSONAL_SETTING_SUCCESS, user });

  const user = JSON.parse(localStorage.getItem('user'));

  return (dispatch) => {
    dispatch(request());

    patch('/personal_setting', personalSetting).then(
      (result) => {
        if (result.success) {
          const updatedUser = { ...user, ...personalSetting };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(success(updatedUser));
        }
      },
    );
  };
};

const userActions = {
  login,
  logout,
  updatePersonalSetting,
};

export default userActions;
