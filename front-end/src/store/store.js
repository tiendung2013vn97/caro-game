import notifyReducer from '../Notify/reducer-notify';
import accountReducer from '../Account/reducer-account'
import enemyAccountReducer from '../Account/AvatarEnemy/reducer-avatar'
import { createStore, combineReducers } from 'redux';
import gameReducer from '../Home/reducer-home'

const reducers = combineReducers({
  notify: notifyReducer,
  account:accountReducer,
  enemyAccount:enemyAccountReducer,
  game:gameReducer
});

const store = createStore(reducers);
export default store;
