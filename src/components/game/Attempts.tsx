import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { sortAttempts } from "../../shared/utils/gameUtils";

export interface IAttemptsWithUrl {
    correctCount: number;
    time: string;
    sequence: number[];  // IDs dos stickers
    stickersInSequence: { id: number; name: string; url: string; }[]; // Novamente, a sequência completa de stickers
}

export const Attempts = () => {
    const { attempts, avaliableStickers } = useSelector((state: RootState) => state.game);

    const [sortedAttempts, setSortedAttempts] = useState<IAttemptsWithUrl[]>([]);

    // Atualiza o array sortedAttempts sempre que avaliableStickers ou attempts mudarem
    useEffect(() => {
        setSortedAttempts(sortAttempts(attempts, avaliableStickers)); // Atualiza o estado com as tentativas completas
    }, [attempts, avaliableStickers]);
   // const getStickersFromSequence = (sequence: number[]): ISticker[] => {
    //    return sequence.map(id => sortedAttempts.find(sticker => sticker.id === id)!);
   // };
    return (
           <div className="w-full max-w-4xl space-y-4">
            <div className="grid gap-4 overflow-auto max-h-[calc(100vh-300px)]" style={{ height: "calc(100vh - 300px)" }}>
                {sortedAttempts.map((attempt: IAttemptsWithUrl, index: number) => {
                    return (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-white">Tentativa {index + 1}</p>
                                    <p className="text-sm text-gray-400">
                                        Acertos: {attempt.correctCount}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Tempo: {attempt.time}
                                </div>
                            </div>
                            {/* Exibe a sequência de stickers */}
                            <div className="flex space-x-2 mt-4">
                                {attempt.stickersInSequence.map((sticker, idx) => (
                                    <div key={idx} className="w-10 h-10 rounded-md overflow-hidden">
                                        <img
                                            src={sticker.url}
                                            alt={sticker.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
