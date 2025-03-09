import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Store {
  seqId: string | number;
  id: string;
  label: string;
  city: string;
  state: string;
}

export interface StoresState {
  rows: Store[];
}

const initialState: StoresState = {
  rows: [],
};

export const storesSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.rows.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.rows.findIndex(
        (store) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    initStore: (state, action: PayloadAction<Store[]>) => {
      state.rows = action.payload;
    },
  },
});

export const { addStore, deleteStore, updateStore, initStore } =
  storesSlice.actions;
export default storesSlice.reducer;
