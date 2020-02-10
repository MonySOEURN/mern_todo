import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    todo: todoReducer,
});