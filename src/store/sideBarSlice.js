import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSideBarOn: false
}

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        setSideBarOn: (state) => {
            state.isSideBarOn = true
    
        },

        setSideBarOf: (state) => {
            state.isSideBarOn = false;
        }
    }

})

export const { setSideBarOf, setSideBarOn } = sideBarSlice.actions;
export const getStatusOfSideBar = (state) => state.sideBar.isSideBarOn;
export default sideBarSlice.reducer;