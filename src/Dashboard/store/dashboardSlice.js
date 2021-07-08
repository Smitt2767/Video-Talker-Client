import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Anonymouse",
  activeUsers: [],
  socketId: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload.activeUsers;
    },
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

export const { setUsername, setActiveUsers, setSocketId } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
