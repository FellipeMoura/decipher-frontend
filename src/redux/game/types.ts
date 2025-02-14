export const GameActionTypes = {
    SET_STICKERS: 'game/setStickers',
    UPDATE_SLOTS: 'game/updateSlots',
    RESET_ATTEMPT: 'game/resetAttempt',
    SET_ACTIVE_STICKER: 'game/setActiveSticker',
    START_GAME: 'game/startGame',
    RESET_GAME: 'game/resetGame',
};

export interface ISticker {
    id: number;
    name: string;
    url: string;
}

export interface IGameState {
    stickers: ISticker[];
    avaliableStickers: ISticker[];
    correctSequence: number[];
    slots: (ISticker | null)[];
    activeSticker: ISticker | null;
    attempts: number;
    startTime: Date | null;
    gameId: number | null;
}