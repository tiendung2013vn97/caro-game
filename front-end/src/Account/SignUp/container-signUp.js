import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from '../../Notify/action-notify';
import SignUp from './SignUp';
import config from '../../config';

class SignUpContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  //render
  render() {
    return <SignUp signUp={this.signUp} />;
  }
  signUp(userInformation) {
    const api = axios.create({ baseURL: config.URL });
    api
      .post('user/register', userInformation)
      .then(res => {
        if (res.data.status === 'fail') {
          switch (res.data.msg) {
            case 'NOT_ENOUGH_FIELD': {
              this.props.showAlertNotify('Vui lòng nhập đủ tất cả các trường!');
              break;
            }
            case 'USERNAME_IS_EXISTED': {
              this.props.showFailNotify(
                'Username này đã tồn tại! Vui lòng chọn username khác!'
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
        this.props.showSuccessNotify(
          'Sign up thành công! Bạn có thể đăng nhập!'
        );
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
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
