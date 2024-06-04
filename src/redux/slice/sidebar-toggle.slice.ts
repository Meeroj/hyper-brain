import { createSlice } from "@reduxjs/toolkit";

interface ISidebarState {
    isSidebarOpen: boolean
}

// Define the initial state with the correct type
const initialState: ISidebarState = {
    isSidebarOpen: false
};

export const sidebarSlice = createSlice({
  name: "Number",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
