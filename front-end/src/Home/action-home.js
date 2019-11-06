export const changeMode=(mode)=>{
    return{
        type:"CHANGE_MODE",
        mode
    }
}

export const updateStatusReady=(readyStatus)=>{
    return{
        type:"UPDATE_READY_STATUS",
        readyStatus
    }
}

export const updateInGameStatus=(status)=>{
    return{
        type:"UPDATE_IN_GAME_STATUS",
        status
    }
}
export const updateMsg=(msg)=>{
    return{
        type:"UPDATE_MSG",
        msg
    }
}

export const updateTurn=(avail_val,myTurn)=>{
    return{
        type:"UPDATE_TURN",
        avail_val,myTurn
    }
}
export const changeTurn=()=>{
    return{
        type:"CHANGE_TURN"
    }
}