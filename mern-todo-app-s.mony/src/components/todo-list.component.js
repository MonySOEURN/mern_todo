import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
            <Link to={`#`} style={{color: 'red', marginLeft: 20,}} onClick={ () => {props.deleteItem(props.todo)}}>Delete</Link>
        </td>
    </tr>
);

export default class TodoList extends Component{

    constructor(props){
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            todo: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
             .then( response => {
                 this.setState({
                     todo: response.data
                 })
             })
             .catch( err=> {
                 console.log(err);
             });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos')
             .then( response => {
                 this.setState({
                     todo: response.data
                 })
             })
             .catch( err=> {
                 console.log(err);
             });
    }

    deleteItem(todo) {
        if (window.confirm(`Delete the todo ${todo.todo_description}?`)) {
            axios.delete('http://localhost:4000/todos/delete/'+todo._id)
             .then( response => {
                this.props.history.push('/');
             })
             .catch( err => {
                 console.log(err);
             });
        }
    }

    showListItems = () => {
        return this.state.todo.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} deleteItem={this.deleteItem}/>;
        });
    }


    render(){
        return (
            <div>
                <h3> Todo List: </h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showListItems()}
                    </tbody>
                </table>
            </div>
        );
    }
}