import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/apiUrls';
import { STATUS } from '../utils/status';



// createAsynckThunk: for request asynck (pendin, fulfilled,rejected) ==> you should use extraReducers


const initialState = {
    statusCategory: STATUS.IDLE,
    categories: [],
    productsByCategory: [],
    statusCategoryProduct: STATUS.IDLE,
}

// request
export const fetChAsynckCategory = createAsyncThunk("fetch/categories", async () => {
    const response = await fetch(`${BASE_URL}products/categories`);
    return await response.json();
})

export const fetAsynckProductByCategory = createAsyncThunk("fetch/productByCategory", async (category) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    return await response.json();
});


const categorylice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetChAsynckCategory.pending, (state, action) => {
                state.statusCategory = STATUS.LOADING
            })
            .addCase(fetChAsynckCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.statusCategory = STATUS.SUCCEEDED
            })
            .addCase(fetChAsynckCategory.rejected, (state, action) => {
                state.statusCategory = STATUS.FAILED;
            })

            // categoryBuProduct
            .addCase(fetAsynckProductByCategory.pending, (state, action) => {
                state.statusCategoryProduct = STATUS.LOADING;
            })
            .addCase(fetAsynckProductByCategory.fulfilled, (state, action) => {
                state.statusCategoryProduct = STATUS.SUCCEEDED;
                state.productsByCategory = action.payload;
            })
            .addCase(fetAsynckProductByCategory.rejected, (state, action) => {
                state.statusCategoryProduct = STATUS.rejected
            })

    }
});


export const getAllCategories = (state) => state.category.categories;
export const getProductByCategory = (state) => state.category.productsByCategory;
export const getStatusProductByCategory = (state) => state.category.statusCategoryProduct;

export default categorylice.reducer;

