import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storeSlice";
import skuReducer from "./skuSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: {
    store: storesReducer,
    sku: skuReducer,
    calendar: calendarReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
