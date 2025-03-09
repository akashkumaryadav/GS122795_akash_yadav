import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Store {
  "Seq No.": string | number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

export interface StoresState {
  rows: Store[];
  columns: string[];
}

const initialState: StoresState = {
  rows: [],
  columns: [],
};

export const storesSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.rows.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((store) => store.ID !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.rows.findIndex(
        (store) => store.ID === action.payload.ID
      );
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    initStore: (
      state,
      action: PayloadAction<{ rows: Store[]; columns: StoresState["columns"] }>
    ) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
    },
  },
});

export const { addStore, deleteStore, updateStore, initStore } =
  storesSlice.actions;
export default storesSlice.reducer;
