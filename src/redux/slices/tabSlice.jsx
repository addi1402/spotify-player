import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tabs',
    initialState: {
        tab:'forYou'
    },
    reducers:{
        setTab: (state, action) => {
            state.tab = action.payload;
        }
    }
});

export default tabSlice.reducer;
export const {setTab} = tabSlice.actions;