

import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../../app/store.ts";
import {fetchDecode, fetchEncode} from "./FormThunk.ts";





interface FormLoadingState {
    isDecodeLoading: boolean;
    isEncodeLoading: boolean;
}



const initialState: FormLoadingState = {
    isDecodeLoading: false,
    isEncodeLoading:false
};


export const selectEncodeLoading = (state: RootState) => state.form.isDecodeLoading;
export const selectDecodeLoading = (state: RootState) => state.form.isEncodeLoading;


export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDecode.pending, (state) => {
            state.isDecodeLoading = true;
        });
        builder.addCase(fetchDecode.fulfilled, (state) => {
            state.isDecodeLoading = false;
        });
        builder.addCase(fetchDecode.rejected, (state) => {
            state.isDecodeLoading = false;
        });
        builder.addCase(fetchEncode.pending, (state) => {
            state.isEncodeLoading = true;
        });

        builder.addCase(fetchEncode.fulfilled, (state) => {
            state.isEncodeLoading = false;
        });

        builder.addCase(fetchEncode.rejected, (state) => {
            state.isEncodeLoading = false;
        });
    }
});


export const formReducer = formSlice.reducer;