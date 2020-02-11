import axios from 'axios';
import { returnErrors } from './errorActions';

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
import { stringify } from 'querystring';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState)) 
         .then ( res => dispatch ({
             type: USER_LOAD,
             payload: res.data,
         }))
         .catch (err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch ({
                type: AUTH_ERROR,

            }); 
         });
};

// Register user
export const register = ({ name, email, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    // Request body
    const body = JSON.stringify({ name, email, password });
    axios.post('/api/users', body, config)
        .then ( res => dispatch ({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch ( err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}  

// Login User
export const login = ({ email, password }) => dispatch => {
    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    // Request body
    const body = JSON.stringify({ email, password });
    axios.post('/api/auth', body, config)
        .then ( res => dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch ( err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

// Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// setup config/headers and token
export const tokenConfig = getState => {
    // GEt token from localstorage
    const token = getState().auth.token;

    // header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }


    // if token add to headers
    if (token) {
        config.headers['x-auth-token'] = token; 
    }
    // console.log(con);

    return config;
}