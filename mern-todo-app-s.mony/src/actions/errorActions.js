import { GET_ERRORS, CLEAR_ERRORS } from './type.action';

// return error
export const returnErrors = ( msg, status, id=null ) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

// cleary error
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};