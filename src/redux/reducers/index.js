import { combineReducers } from "redux"
import { userReducer } from "./userReducer"
import { characterReducer } from "./characterReducer"

export const reducer = combineReducers({
  user: userReducer,
  character: characterReducer
})

