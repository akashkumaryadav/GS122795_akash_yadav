import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  seqId: number;
  id: string;
  label: string;
  city: string;
  state: string;
}

interface StoresState {
  rows: Store[];
}

const initialState: StoresState = {
  rows: [
    {
      seqId: 0,
      label: "Bay Trends",
      city: "phonix",
      id: "ST035",
      state: "CA",
    },
  ],
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
  },
});

export const { addStore, deleteStore, updateStore } = storesSlice.actions;
export default storesSlice.reducer;
