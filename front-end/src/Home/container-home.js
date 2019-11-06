import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from '../Notify/action-notify';
import Home from './Home';
import config from '../config';
import { updateAccountInfo } from '../Account/action-account';
import {updateEnemyAccountInfo} from '../Account/AvatarEnemy/action-avatar'
import { logout } from '../Account/action-account';
import {
  changeMode,
  updateStatusReady,
  updateInGameStatus,
  updateMsg,
  updateTurn
} from './action-home';
import socketIOClient from 'socket.io-client';

class HomeContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

  componentDidMount() {
    this.setState({...this.state,socket:this.props.game.socket})
    if (localStorage.getItem('user')) {
      let userStr = localStorage.getItem('user');
      let user = JSON.parse(userStr);
      this.props.updateAccountInfo(user);
    }
    let socket = this.props.game.socket
    socket.on('enemy out', () => {
      this.props.updateInGameStatus(false)
      this.props.updateStatusReady(false)
      this.props.showAlertNotify('Đối thủ đã ra khỏi phòng.Trận đấu kết thúc!');
    });
    socket.on('found match', (info) => {
      this.props.updateEnemyAccountInfo(JSON.parse(info))
      this.props.updateInGameStatus(true)
      this.props.showSuccessNotify("Đã tìm thấy đối thủ! Let's fight");
    });
    socket.on('send msg',msg=>{
      let lmsg=this.props.game.listMsg;
    lmsg.push({
      type:2,
      msg:msg
    })
    this.props.updateMsg(lmsg)
    })
    socket.on('avail_val', (val) => {
      let res=val.split(',')
      let turn=res[1]==='previous'?true:false
      this.props.updateTurn(+res[0],turn)
    });
    
  }
  //render
  render() {
    return (
      <Home
        account={this.props.account}
        logout={this.logout.bind(this)}
        enemyAccount={this.props.enemyAccount}
        changeMode={this.props.changeMode}
        updateStatusReady={this.updateStatusReady.bind(this)}
        updateInGameStatus={this.updateInGameStatus.bind(this)}
        game={this.props.game}
        sendMsg={this.sendMsg.bind(this)}
        hitSquare={this.hitSquare.bind(this)}
      />
    );
  }
  hitSquare(i,j){
    alert('hit')
  }
  sendMsg(msg){
    let lmsg=this.props.game.listMsg;
    lmsg.push({
      type:1,
      msg:msg
    })
    this.state.socket.emit('send msg',msg)
    this.props.updateMsg(lmsg)
  }
  logout(){
    this.state.socket.emit('out room','');
    this.props.logout()
  }
  updateStatusReady(readyStatus) {
    if (
      this.props.game.curMode === 'player' &&
      this.props.account.fullname 
     
    ) {
      if( readyStatus === true){
        this.state.socket.emit('find match',JSON.stringify(this.props.account));
      }else{
        this.state.socket.emit('cancle find match','');
      }
     
    }
    
    this.props.updateStatusReady(readyStatus)
  }
  updateInGameStatus(status){
    if(status===false){
      this.state.socket.emit('out room',JSON.stringify(this.props.account));
    }
    this.props.updateInGameStatus(status)
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    account: state.account,
    enemyAccount: state.enemyAccount,
    game: state.game
  };
}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {
    //show alert dialog
    showAlertNotify(msg) {
      return dispatch(showAlertNotify(msg));
    },

    //show fail dialog
    showFailNotify(msg) {
      return dispatch(showFailNotify(msg));
    },

    //show alert dialog
    showSuccessNotify(msg) {
      return dispatch(showSuccessNotify(msg));
    },

    updateAccountInfo(user) {
      return dispatch(updateAccountInfo(user));
    },
    logout() {
      localStorage.clear();
      return dispatch(logout());
    },
    changeMode(mode) {
      return dispatch(changeMode(mode));
    },
    updateStatusReady(readyStatus) {
      return dispatch(updateStatusReady(readyStatus));
    },
    updateInGameStatus(status) {
      return dispatch(updateInGameStatus(status));
    },
    updateEnemyAccountInfo(info){
      return dispatch(updateEnemyAccountInfo(info))
    },
    updateMsg(msg){
      return dispatch(updateMsg(msg))
    },
    updateTurn(avail_val,turn){
      return dispatch(updateTurn(avail_val,turn))
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
