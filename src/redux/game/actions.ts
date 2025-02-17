import { IGameResponseDTO } from '../../types/Game';
import { GameActionTypes } from './types';
import { ISticker } from './types';

export const startGame = (gameResponse: IGameResponseDTO) => ({
    type: GameActionTypes.START_GAME,
    payload: { ...gameResponse },
});
export const resetGame = () => ({
    type: GameActionTypes.RESET_GAME,
});
export const setStickers = (stickers: ISticker[]) => ({
    type: GameActionTypes.SET_STICKERS,
    payload: stickers,
});

export const updateSlots = (slots: (ISticker | null)[]) => ({
    type: GameActionTypes.UPDATE_SLOTS,
    payload: slots,
});
export const setActiveSticker = (sticker: ISticker | null) => ({
    type: GameActionTypes.SET_ACTIVE_STICKER,
    payload: sticker,
});
export const insertAttempt = (attempt: { attempts: any, lastAttemptTime: string }) => ({
    type: GameActionTypes.INSERT_ATTEMPT,
    payload: attempt,
});
export const setTimes = (times: {startTime: string, currentTime: string}) => ({
    type: GameActionTypes.SET_TIMES,
    payload: times,
});
export const resetAttempt = () => ({
    type: GameActionTypes.RESET_ATTEMPT,
});








