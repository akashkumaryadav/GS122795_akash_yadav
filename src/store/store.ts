import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storeSlice";

export const store = configureStore({
  reducer: {
    store: storesReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
