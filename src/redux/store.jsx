import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export default store;
