export const authState = {
    isAuthenticated: false,
    userInfo: {},
    error: false,
    imgProfile: {}
  };

  const authReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AUTH_SIGNIN": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload.user,
        };
      }
      case "SIGN_OUT": {
        return {
          ...state,
          isAuthenticated: false,
          user: {},
        };
      }
      case "AUTH_SIGNUP": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
          
        };
      }
      case "SIGNIN_ERR": {
        return {
          ...state,
          error: payload,
        };
      }
      case "AUTH_VALID": {
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
        };
      }
  
      case "CLR_ERR": {
        return {
          ...state,
          error: false,
        };
      }
  case "USER_INFO": {
    return {
      ...state,
      userInfo: payload
    }
  }
 
      default: {
        return state;
      }
    }
  };
  export default authReducer;