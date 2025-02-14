/*import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './reducer';
import { ISticker } from './types';

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setStickers: (state, action: { payload: ISticker[] }) => {
            state.stickers = action.payload;
        },
        updateSlots: (state, action: { payload: (ISticker | null)[] }) => {
            state.slots = action.payload;
        },
        resetAttempt: (state) => {
            state.stickers = initialState.stickers;
            state.slots = initialState.slots;
            state.activeSticker = initialState.activeSticker;
            
        },
        setActiveSticker: (state, action: { payload: ISticker | null }) => {
            state.activeSticker = action.payload;
        },
    },
});

export const { setStickers, updateSlots, resetAttempt, setActiveSticker } = gameSlice.actions;
export default gameSlice.reducer;*/