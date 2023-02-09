import { createSlice } from '@reduxjs/toolkit';
import { fetchFromLocalStorage, storeOnLocalStorage } from '../utils/helpers';

const initialState = {
    cartInfo: fetchFromLocalStorage("cartInfo"),
    totalAmount: 0,
    totalItem: 0,
    itemInCart: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addInfoCart(state, action) {
            const itemInCart = state.cartInfo.find((item) => item.id === action.payload.id);
            const productSelected = action.payload;
            if (itemInCart) {
                const tmpCart = [...state.cartInfo].map((val) =>
                    (val.id === productSelected.id) ? { ...val, quantity: val.quantity + productSelected.quantity } : val
                );
                state.cartInfo = tmpCart;
                storeOnLocalStorage("cartInfo", state.cartInfo);
            } else {
                state.cartInfo.push(productSelected);
                storeOnLocalStorage("cartInfo", state.cartInfo);
            }

            const totalPrice = state.cartInfo.reduce((acc, value) => acc + value.priceTotal, 0)
            const totalItam = state.cartInfo.reduce((acc, value) => acc + value.quantity, 0);
            storeOnLocalStorage("total", [{ totalPrice: totalPrice, totalItam: totalItam }])

            state.totalAmount = totalPrice;
            state.totalItem = totalItam;
        },

        setItemInCart(state, action) {
            state.itemInCart = action.payload;
        },

        removeItemFromCart(state, action) {
            const elementDeleted = action.payload;
            const newElement = state.cartInfo.filter((el) => el.id !== elementDeleted.id);
            state.cartInfo = newElement;
            storeOnLocalStorage("cartInfo", newElement)
        },

        updatItemFromCart(state, action) {
            const elementDeleted = action.payload;
            console.log(elementDeleted);
            let tmpPrice;
            const tmpCart = state.cartInfo.map((val) => {

                if (elementDeleted.product.id === val.id) {

                    if (elementDeleted.type === 'ADD') tmpPrice = val.discPrice + val.priceTotal;

                    if (elementDeleted.type === 'DISC') tmpPrice = val.priceTotal - val.discPrice;

                    return { ...val, priceTotal: tmpPrice };

                } else {
                    return val;
                }
            })

            console.log("tttt", state.cartInfo);

            state.cartInfo = tmpCart;
            storeOnLocalStorage("cartInfo", tmpCart);

        },

        clearCartStore(state, action) {
            state.cartInfo = [];
            localStorage.clear();
        },

        
    }
});

export const { addInfoCart, setItemInCart, removeItemFromCart, updatItemFromCart, clearCartStore, searchProduct } = cartSlice.actions;
export const getInfoCarte = (state) => state.cart.cartInfo;
export const getTotalItem = (state) => state.cart.totalItem;
export const getItemAdded = (state) => state.cart.itemInCart;
export default cartSlice.reducer;