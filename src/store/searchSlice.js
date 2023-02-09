import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/apiUrls';
import { STATUS } from '../utils/status';

const initialState = {
    products: [],
    statusSearch: STATUS.IDLE
}

export const fetSearchProductByTitle = createAsyncThunk(
    "fetch/searchProductByTitle", async (title) => {
        const reponse = await fetch(`${BASE_URL}products/search?q=${title}`)
        console.log(`${BASE_URL}products/search?q=${title}`);
        return await reponse.json();
    }
)

const searchSlice = createSlice({
    name: "searchProduct",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetSearchProductByTitle.pending, (state, action) => {
                state.statusSearch = STATUS.LOADING
            })
            .addCase(fetSearchProductByTitle.fulfilled, (state, action) => {
                state.statusSearch = STATUS.SUCCEEDED
                state.product = action.payload;
            })
            .addCase(fetSearchProductByTitle.rejected, (state, action) => {
                state.statusSearch = STATUS.FAILED
            })
    }
});


export const { searchProduct } = searchSlice.actions;
export const resultSearchProduct = (state) => state.search.product;
export const statusSearchProduct = (state) => state.search.statusSearch;
export default searchSlice.reducer;