import notifyReducer from '../Notify/reducer-notify';
import accountReducer from '../Account/reducer-account'
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
  notify: notifyReducer,
  account:accountReducer
});

const store = createStore(reducers);
export default store;
