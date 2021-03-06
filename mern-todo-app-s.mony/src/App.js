import React, { Component } from 'react';
import logo from './logo.png';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux';
import store from './store';

import TodoList from './components/todo-list.component';
import EditTodo from './components/edit-todo.component';
import CreateTodo from './components/create-todo.component';
import AppNavbar from './components/appNavigationBar.component'; 
import ShoppingList from './components/shopingList.commponent';
import './App.css';
import ItemModel from './models/item.model';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="https://www.google.com" target="_blank">
                <img src={logo} width="30px" height="30px" alt="m-logo"/>
              </a>
              <Link to="/" className="navbar-brand">Mony-SOEURN Todo App</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Todos</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/edit/:id" className="nav-link">Edot-Todos</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create-Todos</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <AppNavbar />
            <Container>
              <ItemModel />
              <ShoppingList />
            </Container>
            <Route path="/" exact component={TodoList}/>
            <Route path="/edit/:id" component={EditTodo}/>
            <Route path="/create" component={CreateTodo}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;