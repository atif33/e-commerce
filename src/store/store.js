// config globat Redux
import { configureStore } from "@reduxjs/toolkit";
import categorieReucer from "./categorieSlice";
import productSliceReducer from "./productSlice";
import SideBarReducer from "./sideBarSlice";
import cartSliceReucer from "./cartSlice"
import searchSliceReducer from "./searchSlice";

const store = configureStore({
    reducer: {
        sideBar: SideBarReducer,
        category: categorieReucer,
        products: productSliceReducer,
        cart: cartSliceReucer,
        search: searchSliceReducer
    }
})

export default store;