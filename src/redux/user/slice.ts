import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './reducer';

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state = initialState
        },
    },
});

export const { login, logout } = userSlice.actions;