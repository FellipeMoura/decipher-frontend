import { GameActionTypes } from './types';
import { IGameState } from './types';

export const initialState: IGameState = {
    avaliableStickers: [],
    stickers: [],
    slots: [],
    correctSequence: [],
    activeSticker: null,
    startTime: null,
    attempts: 0,
    gameId: null,
};

const gameReducer = (state = initialState, action: any) => {
    
    switch (action.type) {
        case GameActionTypes.SET_STICKERS:
            return {
                ...state,
                stickers: action.payload,
            };
        case GameActionTypes.UPDATE_SLOTS:
            return {
                ...state,
                slots: action.payload,
            };
        case GameActionTypes.RESET_ATTEMPT:
            return {
                ...state,
                stickers : state.avaliableStickers,
                slots: Array(state.correctSequence?.length).fill(null),
            };
            case GameActionTypes.RESET_GAME:
            return {
                ...state,
                ...initialState
            };
        case GameActionTypes.SET_ACTIVE_STICKER:
            return {
                ...state,
                activeSticker: action.payload,
            };
            case GameActionTypes.START_GAME:
            return {
                ...state,
                activeSticker: null,
                startTime: null,
                attempts: 0,
                gameId: action.payload.gameId,
                slots: Array(action.payload.correctSequence?.length).fill(null),
                stickers: action.payload.stickers,
                correctSequence: action.payload.correctSequence,
                avaliableStickers: action.payload.stickers,
            };
        default:
            return state;
    }
};

export default gameReducer;