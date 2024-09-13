import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./slices/pagesSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    auth: authReducer
  },
});
