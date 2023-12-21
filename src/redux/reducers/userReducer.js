import { auth } from "../../../firebase.js";
import { initialState } from "../state.js";

export const USER_ACTIONS = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  LOGOUT: "LOGOUT",
}


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      
      return {
        ...state,
      }

    case USER_ACTIONS.SIGNUP:
      
      return {
        ...state,
      }

    case USER_ACTIONS.LOGOUT:
      auth.signOut();
      return {
        ...state,
      }
      
    default:
      console.log("user reducer hello");
      return state;
  }
}