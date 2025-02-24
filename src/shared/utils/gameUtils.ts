import { IAttemptsWithUrl } from "../../components/game";
import { ISticker } from "../../types/Sticker";

export function sortAttempts(attempts: IAttemptsWithUrl[], avaliableStickers: ISticker[]): any[] {
    const resp = attempts.map((attempt: IAttemptsWithUrl) => {
        // Mapeia a sequência de IDs para os objetos completos de stickers
        const stickersInSequence = attempt.sequence.map(id =>
            avaliableStickers.find((sticker: ISticker) => sticker.id === id) // Encontra o sticker correspondente pelo ID
        );

        return { ...attempt, stickersInSequence }; // Inclui o array completo de stickers na tentativa
    });

    return resp;
}

export function sortAttempt(attempts: IAttemptsWithUrl[], avaliableStickers: ISticker[]): any {
   
        const stickersInSequence = attempts?.at(-1)?.sequence.map(id =>
            avaliableStickers.find((sticker: ISticker) => sticker.id === id) // Encontra o sticker correspondente pelo ID
        );      
   

    return {sequence: stickersInSequence, correctCount: attempts?.at(-1)?.correctCount, time: attempts?.at(-1)?.time};
}