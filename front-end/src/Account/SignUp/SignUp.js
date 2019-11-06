import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { Button, Row, Col } from 'antd';

class SignUp extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  //render
  render() {
    return (
      <div className="sign-up-page">
        <div className="sign-up-page_main">
          <div className="form">
            <Row>
              <Col span={11}>
                <div className="row-input">
                  <span> Họ và tên: </span>
                  <input  id="fullname_val" />
                </div>
                <div className="row-input">
                  <span> Username:</span>
                  <input id="username2_val" />
                </div>
                <div className="row-input">
                  <span> Password: </span>
                  <input type="password" id="password2_val" />
                </div>
              </Col>
              <Col span={11} style={{ marginLeft: 20 }}>
                <div className="row-input">
                  <span> Email: </span>
                  <input
                    type="email"
                    id="email_val"
                    placeholder="abc@gmail.com.vn"
                  />
                </div>
                <div className="row-input">
                  <span> Tuổi: </span>
                  <input type="number" id="age_val" placeholder="22" />
                </div>
                <div className="row-input">
                  <span> Giới tính: </span>
                  <input  id="gender_val" placeholder="Nam" />
                </div>
              </Col>
            </Row>
          </div>

          <div className="btn-signup" onClick={this.handleSignUp}>
            Sign up
          </div>
        </div>
      </div>
    );
  }

  /** handleSignUp
    handle user click button sign up
  */
  handleSignUp() {
    let username = document.getElementById('username2_val').value;
    let password = document.getElementById('password2_val').value;
    let email = document.getElementById('email_val').value;
    let fullname = document.getElementById('fullname_val').value;
    let age = document.getElementById('age_val').value;
    let gender = document.getElementById('gender_val').value;

    let userInformation = {
      username,
      password,
      email,
      fullname,
      age,
      gender
    };
    console.log('user',userInformation)
    this.props.signUp(userInformation);
    //let btnSignUp=document.getElementsByClassName('btn-signup')[0];
  }
}

export default SignUp;
