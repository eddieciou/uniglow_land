import { combineReducers } from 'redux';

import alert from './alert.reducer';
import authentication from './authentication.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
});

export default rootReducer;
