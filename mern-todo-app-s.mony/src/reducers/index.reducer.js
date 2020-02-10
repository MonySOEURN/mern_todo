import { combineReducer } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducer({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
});