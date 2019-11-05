import React, { Component } from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class SignIn extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //render
  render() {
    return (
      <div className="login-page">
        <div className="login-page_main">
          <div className="form-login">
            <div className="row-input">
              <span> Username:</span>
              <input type="text" id="username_val" required />
            </div>
            <div className="row-input">
              <span> Password: </span>
              <input type="password" id="password_val" required />
            </div>
          </div>
          <div className="btn-login" onClick={this.handleLogin}>
            Sign in
          </div>
        </div>
      </div>
    );
  }

  /** handleLogin
    handle user click button send
  */
  handleLogin() {
    let username = document.getElementById('username_val').value;
    let password = document.getElementById('password_val').value;

    let userInformation = {
      username: username,
      password: password
    };
    this.props.login(userInformation);
  }
}

export default SignIn;
