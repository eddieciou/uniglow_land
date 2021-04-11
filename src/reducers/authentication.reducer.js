import userConstants from '../constants/user.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.UPDATE_PERSONAL_SETTING_REQUEST:
      return {
        ...state,
        apiPosting: true,
      };
    case userConstants.UPDATE_PERSONAL_SETTING_SUCCESS:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default authentication;
