import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user/user.slice.js";
import messageSlice from "./slice/message/message.slice.js";
import socketReducer from "./slice/socket/socket.slice.js";

export const store = configureStore({
  reducer: {
    userSlice,
    messageSlice,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
