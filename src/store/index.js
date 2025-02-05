import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import socketMiddleware from "./socketMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(socketMiddleware);
  },
});

export default store;
