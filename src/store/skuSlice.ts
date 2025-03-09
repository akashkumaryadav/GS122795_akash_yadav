import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Sku {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: string;
  Cost: string;
}

export interface SkuState {
  rows: Sku[];
  columns: string[];
}

const initialState: SkuState = {
  rows: [],
  columns: [],
};

export const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Sku>) => {
      state.rows.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((store) => store.ID !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Sku>) => {
      const index = state.rows.findIndex(
        (store) => store.ID === action.payload.ID
      );
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    initStore: (
      state,
      action: PayloadAction<{ rows: Sku[]; columns: SkuState["columns"] }>
    ) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
    },
  },
});

export const { addStore, deleteStore, updateStore, initStore } =
  skuSlice.actions;
export default skuSlice.reducer;
