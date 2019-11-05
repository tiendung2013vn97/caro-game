const BaseMsg=require('./msg-base');

class FailMsg extends BaseMsg{
    constructor(msg,status){
        super(status,msg);
      
    }
}

module.exports=FailMsg;