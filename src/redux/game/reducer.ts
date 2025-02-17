import { GameActionTypes } from './types';
import { IGameState } from './types';

export const initialState: IGameState = {
    avaliableStickers: [],
    stickers: [],
    slots: [],
    correctSequence: [],
    activeSticker: null,
    startTime: null,
    currentTime: null,
    lastAttemptTime: '00:00',
    attempts: [],
    gameId: null,
};

const gameReducer = (state = initialState, action: any) => {
    
    switch (action.type) {
        case GameActionTypes.START_GAME:
            return {
                ...state,
                activeSticker: null,
                startTime: null,
                attempts: [],
                gameId: action.payload.gameId,
                slots: Array(action.payload.correctSequence?.length).fill(null),
                stickers: action.payload.stickers,
                correctSequence: action.payload.correctSequence,
                avaliableStickers: action.payload.stickers,
            };
            case GameActionTypes.RESET_GAME:
                return {
                    ...state,
                    ...initialState
                };
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
            case GameActionTypes.SET_ACTIVE_STICKER:
            return {
                ...state,
                activeSticker: action.payload,
            };        
            case GameActionTypes.INSERT_ATTEMPT:
                return {
                    ...state,
                    attempts: action.payload.attempts,
                    lastAttemptTime: action.payload.lastAttemptTime,
                 
                };
                case GameActionTypes.SET_TIMES:
                    return {
                        ...state,
                        startTime: action.payload.startTime,
                        currentTime: action.payload.currentTime,
                    };
                case GameActionTypes.RESET_ATTEMPT:
                    return {
                        ...state,
                        stickers : state.avaliableStickers,
                        slots: Array(state.correctSequence?.length).fill(null),
                    };
                  
        default:
            return state;
    }
};

export default gameReducer;