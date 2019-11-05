import React, { Component } from 'react';
import './Home.scss';
import { Row, Col, Tabs } from 'antd';
import adImg from '.././assets/imgs/adImg.jpg';
import SignIn from '../Account/SignIn/container-signIn';
import SignUp from '../Account/SignUp/container-signUp';
import HomeBg from '../assets/imgs/homeBg.jpg';
import Avatar from '../Account/Avatar/container-avatar'


const { TabPane } = Tabs;
class Home extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    let isLoggin=false
    let user = this.props.account;
    if (user.fullname ) {
      isLoggin=true
    }
    
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
    
    let pageLogged=[]
    pageLogged.push(
      <div className='home-logged'>
        <Avatar/>
      </div>
    )
    return (
      <div className="home">
        {!isLoggin &&<img src={HomeBg} className="img-bg" />}
        {!isLoggin &&  pageNotLoggin }
        {isLoggin&& pageLogged}
      </div>
    );
  }

  /** handleLogin
    handle user click button send
  */
}

export default Home;
