import axios from 'axios';
import error

import { 
    USER_LOAD,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './type.action';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({type: USER_LOADING});

    // get Token from local storage
    const token = getState.auth.token;
    
    // header
    const config = {
        hader: {
            "Content-type": "application/json"
        }
    }

    // if token add to headers
    if (token) {
        config.headers['x-auth-token'] = token; 
    }

    axios.get('/api/auth/user', config) 
         .then ( res => dispatch ({
             type: USER_LOAD,
             payload: res.data,
         }))
         .catch (err => {
            dispatch(returnErros(error.respone.data, err.respone.status));
            dispatch: ({
                type: AUTH_ERROR,

            }); 
         });
}