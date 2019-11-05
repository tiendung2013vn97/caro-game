import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  showAlertNotify,
  showSuccessNotify,
  showFailNotify
} from '../../Notify/action-notify';
import config from '../../config';
import { updateAccountInfo,avatarChange } from '../action-account';
import Avatar from './Avatar'


class AvatarContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.save=this.save.bind(this)
    this.updateImg=this.updateImg.bind(this)
  }

  //render
  render() {
    return <Avatar account={this.props.account} save={this.save} updateImg={this.updateImg}/>;
  }

 save(user){
   const token=localStorage.getItem('token')
  const api = axios.create({ baseURL: config.URL });
  api
    .post('user/update?token='+token, user)
    .then(res => {

      if (res.data.status === 'fail') {
        switch (res.data.msg) {
          case 'NOT_ENOUGH_FIELD': {
            this.props.showAlertNotify(
              'Request thiếu field!'
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

      this.props.storeAccountInfo(user);
      localStorage.setItem('user', JSON.stringify(user));
      
    })
    .catch(err => {
      this.props.showAlertNotify('' + err);
    });
 }
 updateImg(fileImg){
  const token=localStorage.getItem('token')
  const fd = new FormData();
  let extensionFileName = fileImg.name.split('.')[1]
  let imageName = (Date.now()   + '.' + extensionFileName);
  fd.append('file', fileImg, imageName);

  const api = axios.create({ baseURL: config.URL });
  api.post('/user/update-avatar?token='+token, fd)
  .then(res=>{
    if (res.data.status === 'fail') {
      switch (res.data.msg) {
        case 'NO_AVATAR': {
          this.props.showAlertNotify(
            'Vui lòng upload image!'
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
    this.props.avatarChange()
  })
  .catch(err=>{
    this.props.showAlertNotify('' + err);
  })
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

    storeAccountInfo(info) {
      return dispatch(updateAccountInfo(info));
    },

    avatarChange(){
      return dispatch(avatarChange())
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarContainer);
