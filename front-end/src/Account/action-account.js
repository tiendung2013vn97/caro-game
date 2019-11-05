export const updateAccountInfo=(info)=>{
	return {
		type:'UPDATE_ACCOUNT_INFO',
		accountInfo:info
	}
}
export const logout=()=>{
	return{
		type:'LOG_OUT'
	}
    
}

export const avatarChange=()=>{
	return{
		type:'AVATAR_CHANGE'
	}
    
}


