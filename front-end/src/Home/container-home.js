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
import { logout } from '../Account/action-account';
import {changeMode,updateStatusReady,updateInGameStatus} from './action-home'
import socketIOClient from 'socket.io-client'


class HomeContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      let userStr = localStorage.getItem('user');
      let user = JSON.parse(userStr);
      this.props.updateAccountInfo(user);
      const socket=socketIOClient()
      
    }
  }
  //render
  render() {
    return (
      <Home
        account={this.props.account}
        logout={this.props.logout}
        enemyAccount={this.props.enemyAccount}
      changeMode={this.props.changeMode}
      updateStatusReady={this.updateStatusReady.bind(this)}
      updateInGameStatus={this.props.updateInGameStatus}
      game={this.props.game}
      />
    );
  }
  updateStatusReady(readyStatus){
    if(this.props.game.curMode==='player'&& this.props.account.fullname&&readyStatus===true){
      alert('conect');
      //socket.emit()
    }
  }
}

//map state to props
function mapStateToProps(state) {
  return {
    account: state.account,
    enemyAccount: state.enemyAccount,
    game:state.game
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
    changeMode(mode){
      return dispatch(changeMode(mode))
    },
    updateStatusReady(readyStatus){
      return dispatch(updateStatusReady(readyStatus))
    },
    updateInGameStatus(status){
      return dispatch(updateInGameStatus(status))
    }
    
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
