import React, { Component } from 'react';
import './Home.scss';
import { Row, Col, Tabs, Button, Card, Input } from 'antd';
import adImg from '.././assets/imgs/adImg.jpg';
import SignIn from '../Account/SignIn/container-signIn';
import SignUp from '../Account/SignUp/container-signUp';
import HomeBg from '../assets/imgs/homeBg.jpg';
import Avatar from '../Account/Avatar/container-avatar';
import Board from '../Board/container-board';
import config from '../config';

const { TabPane } = Tabs;
class Home extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state={
      msg:''
    }
  }

  //render
  render() {
    let token = null;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    let isLoggin = false;
    let user = this.props.account;
    if (user.fullname) {
      isLoggin = true;
    }

    let disableBtnControlMode =
      this.props.game.readyStatus === true ? true : false;

    let disableBtnSendMsg = true;
    if (this.props.game.inGame && this.props.game.curMode === 'player') {
      disableBtnSendMsg = false;
    }

    let mode =
      this.props.game.curMode === 'player' ? 'Chơi với người' : 'Chơi với máy';
    let pageNotLoggin = [];
    pageNotLoggin.push(
      <Row className="home-nonlogin">
        <Col span={10} className="left">
          <img src={adImg} />
        </Col>
        <Col span={10} className="right">
          <Tabs defaultActiveKey="1">
            <TabPane tab={<h2>Sign In</h2>} key="signin" className="tab-title">
              <SignIn />
            </TabPane>
            <TabPane tab={<h2>Sign Up</h2>} key="signup">
              <SignUp />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );

    let listMsgPage = [];
    let listMsg = this.props.game.listMsg;
    listMsg.forEach((val, index) => {
      if (val.type === 1) {
        //1 la minh

        listMsgPage.push(
          <div className="line-container">
            <Row className="pull-right">
              <Col span={16} style={{ textAlign: 'right' }}>
                {val.msg}
              </Col>
              <Col span={8}>
                <img
                  className="mini-img"
                  src={
                    config.URL +
                    '/user/img?token=' +
                    token +
                    '&&flag=' +
                    new Date().getTime()
                  }
                />
              </Col>
            </Row>
          </div>
        );
      } else {
        listMsgPage.push(
          <div className="line-container">
            <Row className="pull-left">
              <Col span={8}>
                <img
                  className="mini-img"
                  src={
                    config.URL +
                    '/user/imgEnemy?username=' +
                    this.props.enemyAccount.username +
                    '&&token=' +
                    token +
                    '&&flag=' +
                    new Date().getTime()
                  }
                />
              </Col>
              <Col span={16}>{val.msg}</Col>
            </Row>
          </div>
        );
      }
    });

    let pageLogged = [];
    pageLogged.push(
      <div className="home-logged">
        <Row>
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={this.props.logout}
          >
            Log out
          </Button>
        </Row>
        <Row>
          <Col span={18} style={{ position: 'relative' }}>
            <Board className="board-container" style={{ float: 'right' }} />
          </Col>
          <Col span={6}>
            <Row>
              <Avatar />
            </Row>
            <Row style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Chế độ chơi hiện tại: {mode}
            </Row>
            <Row className="row-btn-control">
              {!this.props.game.inGame && (
                <Button
                  type="primary"
                  className="btn-item"
                  onClick={() => this.props.changeMode('player')}
                  disabled={disableBtnControlMode}
                >
                  Chơi với người
                </Button>
              )}
              {!this.props.game.inGame && (
                <Button
                  type="primary"
                  className="btn-item"
                  onClick={() => this.props.changeMode('computer')}
                  disabled={disableBtnControlMode}
                >
                  Chơi với máy
                </Button>
              )}

              {!disableBtnControlMode && !this.props.game.inGame && (
                <Button
                  type="primary"
                  className="btn-item"
                  onClick={() => this.props.updateStatusReady(true)}
                >
                  Sẵn sàng
                </Button>
              )}
              {disableBtnControlMode && !this.props.game.inGame && (
                <Button
                  type="primary"
                  className="btn-item"
                  onClick={() => this.props.updateStatusReady(false)}
                >
                  Hủy sẵn sàng
                </Button>
              )}
              {this.props.game.inGame && (
                <Button
                  type="primary"
                  className="btn-item"
                  onClick={() => this.props.updateInGameStatus(false)}
                >
                  Thoát game
                </Button>
              )}
            </Row>
            <Card
              className="chatbox"
              title="Chat box"
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid black',
                minHeight: 460
              }}
            >
              <Row className="msg-log">
                {listMsgPage}
                </Row>
              <Row className="input-field">
                <Input className="input" type="text" id='msg' value={this.state.msg} onChange={this.handleMsgChange.bind(this)}/>
                <Button
                  type="primary"
                  className="btn-send"
                  disabled={disableBtnSendMsg}
                  onClick={this.sendMsg.bind(this)}
                >
                  Gửi
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
    return (
      <div className="home">
        {!isLoggin && <img src={HomeBg} className="img-bg" />}
        {!isLoggin && pageNotLoggin}
        {isLoggin && pageLogged}
      </div>
    );
  }
  handleMsgChange(e){
    this.setState({...this.state,msg:e.target.value})
  }
  sendMsg() {
    
    this.props.sendMsg(this.state.msg);
    this.setState({...this.state,msg:''})
  }
}

export default Home;
