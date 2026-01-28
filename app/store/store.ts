import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./Userdata_slice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
