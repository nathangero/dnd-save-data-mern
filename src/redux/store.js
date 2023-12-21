import { reducer } from "./reducers/index.js";
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
  reducer
});