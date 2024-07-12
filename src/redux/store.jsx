import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./slices/dataSlice";
import tabReducer from './slices/tabSlice';

const store = configureStore({
  reducer: {
    songs: songReducer,
    tabs: tabReducer,
  },
});

export default store;
