import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { FormDecode, FormEncode } from "../../types";

export const fetchDecode = createAsyncThunk<{ decoded: string }, FormDecode>(
  "form/fetchDecode",
  async (formDecode) => {
    const response = await axiosApi.post<{ decoded: string }>(
      "/decode",
      formDecode,
    );
    return response.data;
  },
);

export const fetchEncode = createAsyncThunk<{ encoded: string }, FormEncode>(
  "form/fetchEncode",
  async (formEncode) => {
    const response = await axiosApi.post("/encode", formEncode);
    return response.data;
  },
);
