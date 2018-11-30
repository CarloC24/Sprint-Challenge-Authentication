import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import login from './components/login';
import users from './components/users';
import register from './components/register';
import { withRouter } from 'react-router';

class App extends Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      return null;
    }
  }
  logout = e => {
    localStorage.clear();
    this.props.history.push('/login');
  };
  render() {
    return (
      <div className="App">
        <Link to="/login">Login</Link>
        <Link to="/users">users</Link>
        <Link to="/register">register</Link>
        <button onClick={this.logout}>Logout</button>
        <Route path="/login" component={login} />
        <Route path="/users" component={users} />
        <Route path="/register" component={register} />
      </div>
    );
  }
}

export default withRouter(App);
