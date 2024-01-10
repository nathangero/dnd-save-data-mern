export const USER_ACTIONS = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  LOGOUT: "LOGOUT",
}

export const CHARACTER_ACTIONS = {
  CREATE: "CREATE",
  GET: "GET",
  EDIT: "EDIT",
  DELETE: "DELETE",
  BACKUP: "BACKUP"
}

const initialState = {
  user: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
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
      return {
        ...state,
        user: null
      }

    /********** CHARACTER **********/
    case CHARACTER_ACTIONS.CREATE:
      console.log("@character create");

      return {
        ...state,
      }

    case CHARACTER_ACTIONS.GET:
      console.log("@character get");

      return {
        ...state,
      }

    case CHARACTER_ACTIONS.EDIT:
      console.log("@character edit");

      return {
        ...state,
      }

    case CHARACTER_ACTIONS.DELETE:
      console.log("@character delete");

      return {
        ...state,
      }

    case CHARACTER_ACTIONS.BACKUP:
      console.log("@character backup");

      return {
        ...state,
      }

    default:
      return state;
  }
}