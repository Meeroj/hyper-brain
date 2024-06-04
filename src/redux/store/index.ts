import { configureStore } from "@reduxjs/toolkit";
import trainingReducer from "../slice/training.slice";
import sidebarSlice  from "../slice/sidebar-toggle.slice";

// Define the root state type
export interface RootState {
  training: ReturnType<typeof trainingReducer>;
  sidebar: ReturnType<typeof sidebarSlice>
}

// Configure the store
const store = configureStore({
  reducer: {
    training: trainingReducer,
    sidebar: sidebarSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Define the store type
export type AppStore = typeof store;

// Define the dispatch type
export type AppDispatch = AppStore['dispatch'];

// Define the state type
export type AppState = ReturnType<AppStore['getState']>;

export default store;
