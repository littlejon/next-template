import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { compactObj } from "lib/functions";
import { AppState, hydrateAction } from "store";

import { CounterState } from "./types";

export const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decCount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state, action) => {
      return {
        ...state,
        ...compactObj(action.payload.counter),
      };
    });
  },
});

export const counterActions = counterSlice.actions;

export type CounterSlice = {
  [counterSlice.name]: ReturnType<typeof counterSlice["reducer"]>;
};

export const selectCounterState = (state: AppState) => state.counter;

export const selectCount = (state: AppState) => state.counter.count;
