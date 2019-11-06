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
      isEditting: false,
      isLoadded: false,
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
      age: account.age,
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
      <div className="avatar-page">
        <div className="img-panel">
          <img src={config.URL + '/user/img?token=' + token+'&&flag='+new Date().getTime()}/>
        </div>
        {this.state.isEditting === false && (
          <div>
            <Row> <italic>Username:</italic> {account.username}</Row>
            <Row>Họ và tên: {account.fullname}</Row>
            <Row>Email: {account.email}</Row>
            <Row>Giới tính: {account.gender}</Row>
            <Row>Tuổi: {account.age}</Row>
            <Row>
              <Button type="primary"  onClick={this.edit.bind(this)}>Edit</Button>
            </Row>
          </div>
        )}
        {this.state.isEditting === true && (
          <div>
            <Row className='row'>
              <Col span={8}>
                Thay đổi avatar
                </Col>
                <Col span={8}>
                  <input type='file' id='file'/>
                </Col>
            </Row>
            <Row className='row'>
              <Input
                type="text"
                value={account.username}
                disabled
              />
            </Row>
            <Row className='row'>
              <Input
                type="text"
                id="val_fullname"
                value={this.state.fullname}
                onChange={this.handleOnFullnameChange.bind(this)}
              />
            </Row>

            <Row className='row'>
              <Input
                type="text"
                id="val_email"
                value={this.state.email}
                onChange={this.handleOnEmailChange.bind(this)}
              />
            </Row>
            <Row className='row'>
              <Input
                type="text"
                id="val_gender"
                value={this.state.gender}
                onChange={this.handleOnGenderChange.bind(this)}
              />
            </Row>
            <Row className='row'>
              <Input
                type="number"
                id="val_age"
                value={this.state.age}
                onChange={this.handleOnAgeChange.bind(this)}
              />
            </Row>

            <Row>
              <Button type="primary" onClick={this.save.bind(this)}>Save</Button>
              <Button type="primary"  onClick={this.cancle.bind(this)} style={{marginLeft:20}}>Cancle</Button>
            </Row>
          </div>
        )}
      </div>
    );
  }
  handleOnAgeChange(e) {
    this.setState({ ...this.state, age: e.target.value });
  }
  handleOnEmailChange(e) {
    this.setState({ ...this.state, email: e.target.value });
  }
  handleOnGenderChange(e) {
    this.setState({ ...this.state, gender: e.target.value });
  }
  handleOnFullnameChange(e) {
    this.setState({ ...this.state, fullname: e.target.value });
  }
  edit() {
    this.setState({ ...this.state, isEditting: true });
  }
  cancle() {
    let account = this.props.account;
    this.setState({
      ...this.state,
      fullname: account.fullname,
      email: account.email,
      age: account.age,
      gender: account.gender,
      isEditting: false
    });
  }
  save() {
    let fileImg = document.getElementById('file').files[0];
    if (fileImg !== undefined) {
     this.props.updateImg(fileImg);
    }
    let user = {
      username: this.props.account.username,
      fullname: document.getElementById('val_fullname').value,
      gender: document.getElementById('val_gender').value,
      age: document.getElementById('val_age').value,
      email: document.getElementById('val_email').value
    };
    this.props.save(user);
    this.setState({...this.state,isEditting:false})
  }
}

export default Avatar;
