const init = {
  fullname: 'a',
  email: 'a@gmail',
  username: 'as',
  gender: 'ds',
  age: 34,
  flagChange: false
};

const accountReducer = (state = init, action) => {
  switch (action.type) {
    case 'UPDATE_ENEMY_ACCOUNT_INFO': {
      return {
        ...state,
        ...action.accountInfo
      };
    }
    case 'RESET_ENEMY_ACCOUNT': {
      return init;
    }
    case 'LOG_OUT': {
      return init;
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
