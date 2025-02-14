import { IGameResponseDTO } from '../../types/Game';
import { GameActionTypes } from './types';
import { ISticker } from './types';

export const setStickers = (stickers: ISticker[]) => ({
    type: GameActionTypes.SET_STICKERS,
    payload: stickers,
});

export const updateSlots = (slots: (ISticker | null)[]) => ({
    type: GameActionTypes.UPDATE_SLOTS,
    payload: slots,
});

export const resetAttempt = () => ({
    type: GameActionTypes.RESET_ATTEMPT,
});

export const resetGame = () => ({
    type: GameActionTypes.RESET_GAME,
});

export const setActiveSticker = (sticker: ISticker | null) => ({
    type: GameActionTypes.SET_ACTIVE_STICKER,
    payload: sticker,
});

export const startGame = (gameResponse: IGameResponseDTO) => ({
    type: GameActionTypes.START_GAME,
    payload: { ...gameResponse },
});



