class BaseMsg{
    constructor(status,msg,buffer={}){
        this.msg=msg;
        //this.buffer=buffer;
        this.buffer=Object.assign({},buffer);
        this.status=status;
    }
    // get(){
    //     return {
    //         statusCode:this.statusCode,
    //         msg:this.msg,
    //         buffer:this.buffer
    //     };
    // }
}

module.exports=BaseMsg;