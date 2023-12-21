import { auth } from "../../../firebase.js";
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
      
      return {
        ...state,
        characters: []
      }

    case CHARACTER_ACTIONS.GET:
      
      return {
        ...state,
        characters: []
      }

    case CHARACTER_ACTIONS.EDIT:
      
      return {
        ...state,
        characters: []
      }

    case CHARACTER_ACTIONS.DELETE:
      
      return {
        ...state,
        characters: []
      }

    case CHARACTER_ACTIONS.BACKUP:
      
      return {
        ...state,
        characters: []
      }

    default:
      console.log("character reducer hello");
      return state;
  }
}