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