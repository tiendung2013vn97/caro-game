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


class HomeContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

   componentDidMount(){
    if(localStorage.getItem('user')){
      let userStr= localStorage.getItem('user')
      let user= JSON.parse(userStr) ;
      this.props.updateAccountInfo(user)
    }
  }
  //render
  render() {
    return <Home account={this.props.account} />;
  }

}

//map state to props
function mapStateToProps(state) {
  return {
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

    updateAccountInfo(user){
      return dispatch(updateAccountInfo(user))
    }

  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
