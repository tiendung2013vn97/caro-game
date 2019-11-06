import notifyReducer from '../Notify/reducer-notify';
import accountReducer from '../Account/reducer-account'
import enemyAccountReducer from '../Account/AvatarEnemy/reducer-avatar'
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
  notify: notifyReducer,
  account:accountReducer,
  enemyAccount:enemyAccountReducer
});

const store = createStore(reducers);
export default store;
