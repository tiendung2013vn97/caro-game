const msgSuccess=require('./msg-success');
const msgFail=require('./msg-fail');

exports.createMsgSuccess=(msg='Successfully!',buffer={},status='success')=>{
    return new msgSuccess(msg,buffer,status);
}

exports.createMsgFail=(msg='Failed!',status='fail')=>{
    return new msgFail(msg,status);
}