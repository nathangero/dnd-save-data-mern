import { initialState } from "../state.js";

export const USER_ACTIONS = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  LOGOUT: "LOGOUT",
}


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      console.log("@user login");
      return {
        ...state,
        user: action.user
      }

    case USER_ACTIONS.SIGNUP:
      console.log("@user signup");
      return {
        ...state,
        user: action.user
      }

    case USER_ACTIONS.LOGOUT:
      console.log("@user logout");
      return {
        ...state,
        user: null
      }
      
    default:
      return state;
  }
}