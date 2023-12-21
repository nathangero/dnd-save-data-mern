import { reducer } from "./reducers/reducers";
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
  reducer
});