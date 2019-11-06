import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import './Avatar.scss';
import config from '../../config';
import { View, Image } from 'react-native';
import { Input } from 'antd';

class Avatar extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      age: '',
      gender: ''
    };
  }

  componentDidMount() {
    let account = this.props.account;
    this.setState({
      ...this.state,
      fullname: account.fullname,
      email: account.email,
      age:  account.age,
      gender: account.gender
    });
  }

  //render
  render() {
    

    let account = this.props.account;
    let token = null;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    return (
      <div className="avatar-page-enemy">
        <div className="img-panel">
          <img src={config.URL + '/user/imgEnemy?username='+account.username+'&&token=' + token+'&&flag='+new Date().getTime()}/>
        </div>

          <div>
            <Row> <italic>Username:</italic> {account.username}</Row>
            <Row>Họ và tên: {account.fullname}</Row>
            <Row>Email: {account.email}</Row>
            <Row>Giới tính: {account.gender}</Row>
            <Row>Tuổi: {account.age}</Row>
          </div>
    
      </div>
    );
  }
 
}

export default Avatar;
