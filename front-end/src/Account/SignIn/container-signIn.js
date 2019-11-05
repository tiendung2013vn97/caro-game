import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from '../../Notify/action-notify';
import SignIn from './SignIn';
import { updateAccountInfo } from '../action-account';
import config from '../../config';

class SignInContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  //render
  render() {
    return <SignIn login={this.login} />;
  }

  login(userInformation) {
    const api = axios.create({ baseURL: config.URL });
    api
      .post('user/login', userInformation)
      .then(res => {
        if(res.data.message==='USERNAME_OR_PASSWORD_WRONG'){
          return this.props.showFailNotify(
            'Username hoặc password sai. Vui lòng nhập lại!'
          );
        }
        if (res.data.status === 'fail') {
          switch (res.data.msg) {
            case 'NOT_ENOUGH_FIELD': {
              this.props.showAlertNotify(
                'Vui lòng nhập đủ username và password!'
              );
              break;
            }
            case 'USERNAME_OR_PASSWORD_WRONG': {
              this.props.showailNotify(
                'Username hoặc password sai. Vui lòng nhập lại!'
              );
              break;
            }
            default: {
              this.props.showFailNotify(res.data.msg);
              break;
            }
          }
          return;
        }
      
        let user = res.data.user;
        this.props.storeAccountInfo(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.data.token);
        
      })
      .catch(err => {
        this.props.showAlertNotify('' + err);
      });
  }
}

//map state to props
function mapStateToProps(state) {
  return {};
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

    storeAccountInfo(info) {
      return dispatch(updateAccountInfo(info));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
