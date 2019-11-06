const init = {
   curMode:'computer',
   readyStatus:false,
   hasOtherPlayer:false,
   inGame:false
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
        case 'LOG_OUT':{
            return init;
        }
        default: {
            return state;
        }
    }
};

export default gameReducer;
