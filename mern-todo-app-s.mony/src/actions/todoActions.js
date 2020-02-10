import axios from 'axios';
import { GET_TODOS, ADD_TODO, DELETE_TODO, TODO_LOADING } from './type.action';

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading());
    axios.get('/').then(res => 
        dispatch({
            type: GET_TODOS,
            payload: res.data
        })
    )
}

export const addTodo = todo => dispatch => {
    axios.post('/', todo).then( res => 
        dispatch ({
            type: ADD_TODO,
            payload: res.data
        }) 
    )
}

export const deleteTodo = id => dispatch => {
    axios.delete(`/${id}`).then( res => {
        dispatch ({
            type: DELETE_TODO,
            payload: id,
        });
    });
}

export const setTodosLoading = () => {
    return {
        type: TODO_LOADING
    }
}

