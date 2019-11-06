import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from '../Notify/action-notify';
import {changeTurn} from '../Home/action-home'

import config from '../config';
import Board from './Board'

class BoardContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    return <Board  game={this.props.game} hitSquare={this.hitSquare.bind(this)} enemyAccount={this.props.enemyAccount}
    account={this.props.account} changeTurn={this.props.changeTurn}
    showSuccessNotify={this.props.showSuccessNotify}
    showFailNotify={this.props.showFailNotify}
  />;
  }
  hitSquare(i,j){
      if(this.props.game.myTurn){
        this.props.game.socket.emit('hit',`${i},${j}`)
        this.props.changeTurn()
      }
    
   
}
}

//map state to props
function mapStateToProps(state) {
  return {
    game:state.game,
    enemyAccount:state.enemyAccount,
    account:state.account

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
    changeTurn(){
        return dispatch(changeTurn())
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

