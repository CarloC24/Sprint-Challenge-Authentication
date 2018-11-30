import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class User extends Component {
  state = {
    jokes: ''
  };
  async componentDidMount() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: token
        }
      };
      try {
        const response = await axios.get(
          'http://localhost:3300/api/jokes',
          options
        );
        if (response) {
          this.setState({ jokes: response.data });
        }
      } catch (err) {
        alert('failed authorization');
      }
    }
  }
  render() {
    return (
      <div>
        <h1>Users component</h1>
        {this.state.jokes ? (
          this.state.jokes.map((item, index) => {
            return (
              <div key={index} style={{ margin: '50px' }}>
                <h1>{item.type}</h1>
                <h1>{item.setup}</h1>
                <h1>{item.punchline}</h1>
              </div>
            );
          })
        ) : (
          <h1>Please Login</h1>
        )}
      </div>
    );
  }
}
