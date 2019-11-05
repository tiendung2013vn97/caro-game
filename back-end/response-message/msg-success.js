const BaseMsg=require('./msg-base');

class SuccessMsg extends BaseMsg{
    constructor(msg,buffer,status){
        super(status,msg,buffer);
    }
}

module.exports=SuccessMsg;