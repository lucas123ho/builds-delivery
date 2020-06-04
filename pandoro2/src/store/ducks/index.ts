import { combineReducers } from 'redux';

import user from './user';
import route from './route';
import sale from './sale';
import grupos from './grupos';
import pedidos from './pedidos';
import config from './config';

export default combineReducers({
  user,
  route,
  sale,
  grupos,
  pedidos,
  config
});