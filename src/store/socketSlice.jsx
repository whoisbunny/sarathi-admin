import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  socketId: null,
  messages: [],
  activeUsers: [],
  searchContact: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload.flag;
      state.socketId = action.payload.id;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setContactSearch: (state, action) => {
      state.searchContact = action.payload;
    },
  },
});

export const { setConnected, addMessage, setActiveUsers } = socketSlice.actions;
export default socketSlice.reducer;
