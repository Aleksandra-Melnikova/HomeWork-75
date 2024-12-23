import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { fetchDecode, fetchEncode } from "./FormThunk.ts";

interface FormLoadingState {
  encoded: { encoded: string } | null;
  decoded: { decoded: string } | null;
  isDecodeLoading: boolean;
  isEncodeLoading: boolean;
}

const initialState: FormLoadingState = {
  encoded: null,
  decoded: null,
  isDecodeLoading: false,
  isEncodeLoading: false,
};

export const selectEncodeLoading = (state: RootState) =>
  state.form.isDecodeLoading;
export const selectDecodeLoading = (state: RootState) =>
  state.form.isEncodeLoading;
export const selectEncode = (state: RootState) => state.form.encoded;
export const selectDecode = (state: RootState) => state.form.decoded;

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDecode.pending, (state) => {
      state.decoded = null;
      state.encoded = null;
      state.isDecodeLoading = true;
    });
    builder.addCase(fetchDecode.fulfilled, (state, action) => {
      state.decoded = action.payload;
      state.isDecodeLoading = false;
    });
    builder.addCase(fetchDecode.rejected, (state) => {
      state.isDecodeLoading = false;
    });
    builder.addCase(fetchEncode.pending, (state) => {
      state.decoded = null;
      state.encoded = null;
      state.isEncodeLoading = true;
    });

    builder.addCase(fetchEncode.fulfilled, (state, action) => {
      state.encoded = action.payload;
      state.isEncodeLoading = false;
    });

    builder.addCase(fetchEncode.rejected, (state) => {
      state.isEncodeLoading = false;
    });
  },
});

export const formReducer = formSlice.reducer;
