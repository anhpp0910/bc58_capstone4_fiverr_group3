import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousUrl: null,
};

const previousUrlSlice = createSlice({
    name: 'previousUrlSlice',
    initialState,
    reducers: {
        setPreviousUrl: (state, action) => {
            state.previousUrl = action.payload;
        },
    },
});

export const { setPreviousUrl } = previousUrlSlice.actions;

export default previousUrlSlice.reducer;
