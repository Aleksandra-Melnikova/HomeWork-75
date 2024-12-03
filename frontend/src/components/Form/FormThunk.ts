import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {FormDecode, FormEncode} from "../../types";

// export const fetchProducts = createAsyncThunk<Product[],void>(
//     'products/fetchProducts',
//     async () => {
//         const productsResponse = await axiosApi.get<Product[]>('/products');
//         return productsResponse.data || [];
//     }
// );

export const fetchDecode = createAsyncThunk<void, FormDecode>(
    'form/fetchDecode',
    async (formDecode) => {
        return axiosApi.post('/decode', formDecode);
    }
);

export const fetchEncode = createAsyncThunk<void, FormEncode>(
    'form/fetchEncode',
    async (formEncode) => {
        return axiosApi.post('/encode', formEncode);
    }
);