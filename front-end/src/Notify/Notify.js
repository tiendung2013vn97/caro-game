import React,{Component} from 'react'
import './Notify.scss'
import SuccessIcon from '../assets/imgs/successIcon.png'
import FailIcon from '../assets/imgs/failIcon.png'
import AlertIcon from '../assets/imgs/alertIcon.png'

class Notify extends Component{

  //constructor
  constructor(props){
    super(props);
  }

  //render
  render(){
    
    let typeNotify=this.props.typeNotify;
    let msg=this.props.msg;

    let notifySuccessDialog=[];
    notifySuccessDialog.push(
        <div className='main-dialog'>
            <img src={SuccessIcon}/>
            <br/>            
            <div className='title-green'>Success</div>

            <div className='message-content'>
             {msg}
            </div>
            <button className='btn-green' onClick={this.props.closeNotify}>
              OK
            </button>
          </div>
      );
    
    let notifyAlertDialog=[];
    notifyAlertDialog.push(
        <div className='main-dialog'>
            <img src={AlertIcon}/>
            <br/>            
            <div className='title-red'>Alert</div>

            <div className='message-content'>
              {msg}
            </div>
            <button className='btn-red' onClick={this.props.closeNotify}>
              Cancel
            </button>
          </div>
      );
    
    let notifyFailDialog=[];
    notifyFailDialog.push(
        <div className='main-dialog'>
            <img src={FailIcon}/>
            <br/>            
            <div className='title-red'>Fail</div>

            <div className='message-content'>
              {msg}
            </div>
            <button className='btn-red' onClick={this.props.closeNotify}>
              Cancel
            </button>
          </div>
      );
    
    return (
        <div className='notify-dialog' style={{'display':typeNotify!=null?'block':'none'}} >
         {typeNotify=='success'?notifySuccessDialog:null}
         {typeNotify=='fail'?notifyFailDialog:null}
         {typeNotify=='alert'?notifyAlertDialog:null}
        </div>
      );
  }

}

export default Notify