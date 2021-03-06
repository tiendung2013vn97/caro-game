const init = {
  fullname: null,
  email: null,
  username: null,
  gender: null,
  age: null,
  flagChange:false
};

const accountReducer = (state = init, action) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT_INFO': {
      return {
        ...state,
        ...action.accountInfo
      };
    }
    case 'LOG_OUT': {
      localStorage.clear();
      return init
    }
    case 'AVATAR_CHANGE': {
      return {
       ...state,
        flagChange:!state.flagChange
      };
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
