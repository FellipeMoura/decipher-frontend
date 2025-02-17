export const GameActionTypes = {
    START_GAME: 'game/startGame',
    RESET_GAME: 'game/resetGame',
    SET_STICKERS: 'game/setStickers',
    UPDATE_SLOTS: 'game/updateSlots',
    SET_ACTIVE_STICKER: 'game/setActiveSticker',
    INSERT_ATTEMPT: 'game/insertAttempt',
    RESET_ATTEMPT: 'game/resetAttempt',
    SET_TIMES: 'game/startTime',
   
};

export interface ISticker {
    id: number;
    name: string;
    url: string;
}

export interface IAttempts {
    correctCount: number;
    time: string;
    sequence: number[];
}
export interface IGameState {
    stickers: ISticker[];
    avaliableStickers: ISticker[];
    correctSequence: number[];
    slots: (ISticker | null)[];
    activeSticker: ISticker | null;
    attempts: IAttempts[];
    startTime: Date | null;
    currentTime: string | null;
    lastAttemptTime: string;
    gameId: number | null;
}