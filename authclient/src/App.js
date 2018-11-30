import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import login from './components/login';
import users from './components/users';
import register from './components/register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/login">Login</Link>
        <Link to="/users">users</Link>
        <Link to="/register">register</Link>
        <Route path="/login" component={login} />
        <Route path="/users" component={users} />
        <Route path="/register" component={register} />
      </div>
    );
  }
}

export default App;
