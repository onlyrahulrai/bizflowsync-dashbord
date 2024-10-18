import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        authenticated: (state, action) => {
            state.user = action.payload;
        },
        loaded: (state, action) => {
            state.user = action.payload;
        },
    }
})

export default authSlice.reducer;