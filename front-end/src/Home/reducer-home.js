import socketIOClient from 'socket.io-client';
const init = {
   curMode:'computer',
   readyStatus:false,
   hasOtherPlayer:false,
   inGame:false,
   url:'localhost:3000',
   listMsg:[],
   avail_val:0,
   myTurn:true,
   socket:socketIOClient('localhost:3000'),
   listHit: [],
   logic_board: [],
};

const gameReducer = (state = init, action) => {
    switch (action.type) {
        case 'UPDATE_READY_STATUS':{
            return{
                ...state,
                readyStatus:action.readyStatus
            }
        }
        case 'CHANGE_MODE':{
    
            return{
                ...state,
                curMode:action.mode
            }
        }
        case 'UPDATE_IN_GAME_STATUS':{
            return{
                ...state,
                inGame:action.status
            }
        }
        case 'UPDATE_MSG':{
            return{
                ...state,
                listMsg:action.msg
            }
        }
        case 'UPDATE_TURN':{
            return{
                ...state,
                avail_val:action.avail_val,
                myTurn:action.myTurn
            }
        }
        case 'CHANGE_TURN':{
            return{
                ...state,
                myTurn:!state.myTurn
            }
        }
        case 'LOG_OUT':{
            return init;
        }
        default: {
            return state;
        }
    }
};

export default gameReducer;
