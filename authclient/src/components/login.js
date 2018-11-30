import React, { Component } from 'react';

export default class login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
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
