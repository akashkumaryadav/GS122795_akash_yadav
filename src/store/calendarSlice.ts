import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Calendar {
  "Seq No.": string | number;
  Week: string;
  "Week Label": string;
  Month: string;
  "Month Label": string;
}

export interface CalendarState {
  rows: Calendar[];
  columns: string[];
}

const initialState: CalendarState = {
  rows: [],
  columns: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Calendar>) => {
      state.rows.push(action.payload);
    },
    initStore: (
      state,
      action: PayloadAction<{
        rows: Calendar[];
        columns: CalendarState["columns"];
      }>
    ) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
    },
  },
});

export const { addStore, initStore } = calendarSlice.actions;
export default calendarSlice.reducer;
