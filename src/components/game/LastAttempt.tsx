import { useSelector } from "react-redux";
import { sortAttempt } from "../../shared/utils/gameUtils";
import { LastAttemptContainer, LastAttemptStatus } from "../layouts/GameLayouts";
import { RootState } from "../../redux/store";
import { ISticker } from "../../types/Sticker";

export const LastAttempt = () => {
    const { attempts, avaliableStickers, slots } = useSelector((state: RootState) => state.game);
    const sortedAttempt = sortAttempt(attempts, avaliableStickers);
    const correctPercentage = (sortedAttempt.correctCount / slots.length) * 100;
    // Total possível de acertos (número de slots)
 
    if (!attempts.length) {
        return (
            <div className="w-full h-24 flex items-center justify-center text-gray-400 italic text-sm border border-dashed border-gray-600 rounded-lg">
                Nenhuma tentativa realizada ainda
            </div>
        );
    }    

    return (
        <LastAttemptContainer>
            {/* Informações da tentativa */}
            <LastAttemptStatus sortedAttempt={sortedAttempt} correctPercentage={correctPercentage} />
                
            {/* Stickers da sequência */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4 p-2 w-full justify-center bg-gray-800/30 rounded-lg border border-gray-700">
                {sortedAttempt.sequence.map((sticker: ISticker | null, index: number) => (
                    <div key={index} className="flex justify-center">
                        <img
                            src={sticker?.url}
                            alt={sticker?.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 p-1 border border-gray-300 rounded-md bg-white object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Barra de progresso visual opcional */}
            <div className="w-full h-1 mt-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${correctPercentage === 100 ? "bg-green-500" :
                            correctPercentage >= 75 ? "bg-green-400" :
                                correctPercentage >= 50 ? "bg-yellow-400" :
                                    correctPercentage >= 25 ? "bg-orange-400" : "bg-red-400"
                        }`}
                    style={{ width: `${correctPercentage}%` }}
                ></div>
            </div>
        </LastAttemptContainer>
    );
};