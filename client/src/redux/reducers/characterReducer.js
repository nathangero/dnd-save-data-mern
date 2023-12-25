import { initialState } from "../state.js";

export const CHARACTER_ACTIONS = {
  CREATE: "CREATE",
  GET: "GET",
  EDIT: "EDIT",
  DELETE: "DELETE",
  BACKUP: "BACKUP"
}

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
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