import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {
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
          'http://localhost:3300/api/login',
          this.state
        );
        if (response) {
          localStorage.setItem('token', response.data.token);
          this.props.history.push('/');
          alert(response.data.Message);
        }
      } catch (err) {
        alert('not a valid user');
      }
    } else {
      alert('username and password cannot be empty');
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
          />
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          />
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
}
