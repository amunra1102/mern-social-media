
import { combineReducers } from 'redux';
import alertReducer from './alert/alert.reducer';

import authReducer from './auth/auth.reducer';
import notifyReducer from './notify/notify.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  notify: notifyReducer
});

export default rootReducer;
