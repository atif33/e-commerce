import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../utils/apiUrls';
import { STATUS } from '../utils/status';

const initialState = {
    products: [],
    productStatus: STATUS.IDLE,
    singleProduct: {},
    singleProductStatus: STATUS.IDLE

}
// gettin products by limits
export const fetAsynchProducts = createAsyncThunk("fetch/product", async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`)
    return await response.json();
})

// gettin single product
export const fetchSingleProduct = createAsyncThunk("fetch/singlProduct", async (numProduct) => {
    const response = await fetch(`${BASE_URL}product/${numProduct}`)
    return await response.json();
})



const proudctSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProduct(state, action) {
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetAsynchProducts.pending, (state, action) => {
                state.productStatus = STATUS.LOADING
            })
            .addCase(fetAsynchProducts.fulfilled, (state, action) => {
                state.productStatus = STATUS.SUCCEEDED;
                state.products = action.payload
            })
            .addCase(fetAsynchProducts.rejected, (state, action) => {
                state.productStatus = STATUS.rejected;
            })

            //Single Product
            .addCase(fetchSingleProduct.pending, (state, action) => {
                state.singleProductStatus = STATUS.pending
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.singleProductStatus = STATUS.SUCCEEDED;
                state.singleProduct = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.singleProductStatus = STATUS.FAILED;
            })
    }
})


export const { searchProduct } = proudctSlice.actions
export const getAllProducts = (state) => state.products.products.products;
export const getProductsStatus = (state) => state.products.productStatus;
export const getSingleProduct = (state) => state.products.singleProduct;
export default proudctSlice.reducer;