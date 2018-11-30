import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      try {
        const response = await axios.post(
          'http://localhost:3300/api/register',
          this.state
        );
        this.setState({ username: '', password: '' });
        this.props.history.push('/');
        alert('register successful');
      } catch (err) {
        alert('Register not successful');
      }
    } else {
      alert('username and password cannot be empty');
    }
  };
  render() {
    return (
      <div>
        <h1>Register Component</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            placeholder="username"
          />
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            placeholder="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
