export const updateEnemyAccountInfo=(info)=>{
	return {
		type:'UPDATE_ENEMY_ACCOUNT_INFO',
		accountInfo:info
	}
}


export const updateAccountInfo=()=>{
	return {
		type:'RESET_ENEMY_ACCOUNT'
	}
}

