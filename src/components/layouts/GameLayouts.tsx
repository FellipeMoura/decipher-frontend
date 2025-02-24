// GameLayouts.tsx
import { ISticker } from "../../types/Sticker";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import './GameLayouts.css';
import { Camera, Clock, Crown, Target } from "lucide-react";


export const GameContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="h-game-container w-full flex flex-col justify-center items-center
                      mt-14 mx-auto
                      px-4 py-4
                      bg-gradient-to-b from-gray-900 to-gray-800
                      text-white overflow-hidden">
            {children}
        </div>
    );
}

export const NavGame: React.FC<{ activeTab: any, setActiveTab: any }> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex bg-gray-800/80 rounded-lg p-1 border border-gray-700 mb-3 sticky top-0 z-10">
            <button
                onClick={() => setActiveTab('game')}
                className={`flex items-center px-3 py-1.5 rounded-md transition-colors duration-200 text-sm sm:text-base sm:px-4 sm:py-2 ${activeTab === 'game'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
            >
                <Camera className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                Jogo
            </button>
            <button
                onClick={() => setActiveTab('attempts')}
                className={`flex items-center px-3 py-1.5 rounded-md transition-colors duration-200 text-sm sm:text-base sm:px-4 sm:py-2 ${activeTab === 'attempts'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
            >
                <Crown className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                Tentativas
            </button>
        </div>
    )
}

export const TabsContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-game-content bg-gray-800/50 rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700 overflow-hidden flex flex-col">
            {children}
        </div>
    );
}

export const FieldContainer: React.FC<{ children: React.ReactNode, title?: String }> = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col items-center overflow-hidden">
            {children}
        </div>
    );
}

const Field: React.FC<{ children: React.ReactNode, title: String }> = ({ children, title }) => {
    return (
        <section className="w-full mb-4 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl text-white mb-2">{title}</h2>
            {children}
        </section>
    );
}

export const SlotsField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Field title="Tabuleiro">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4 p-2 w-full justify-center">
                {children}
            </div>
        </Field>
    );
};

export const AvailableField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isOver, setNodeRef } = useDroppable({ id: "available" });
    const style = {
        background: isOver ? "#d1fae5" : "",
    };
    return (
        <Field title="Stickers disponíveis">
            <div
                ref={setNodeRef}
                style={style}
                className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4 p-2 w-full justify-center"
            >
                {children}
            </div>
        </Field>
    );
};

// Componente para tornar um sticker arrastável
export const DraggableSticker = ({ sticker }: { sticker: ISticker }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: sticker.id.toString(),
    });
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-white hover:shadow-lg transition-shadow"
        >
            <img src={sticker.url} alt={sticker.name} className="max-w-full max-h-full p-1" />
        </div>
    );
};

export const LastAttemptContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Field title="Última tentativa">
            <div className="w-full">
                {children}
            </div>
        </Field>
    )
}

export const LastAttemptStatus: React.FC<{ correctPercentage: number, sortedAttempt: any }> = ({ sortedAttempt, correctPercentage }) => {
    
    const getColorClass = () => {
        if (correctPercentage === 100) return "bg-green-500 text-white";
        if (correctPercentage >= 75) return "bg-green-400 text-white";
        if (correctPercentage >= 50) return "bg-yellow-400 text-gray-800";
        if (correctPercentage >= 25) return "bg-orange-400 text-white";
        return "bg-red-400 text-white";
    };
   console.log(sortedAttempt)
    return (
        <div className="flex flex-wrap justify-between items-center mb-2 px-1">
           <div className={`flex items-center gap-1 font-medium ${getColorClass()}`}>
                    <Target className="w-4 h-4" />
                    <span className="text-base">
                        {sortedAttempt.correctCount || 0} acertos
                        {correctPercentage === 100 && (
                            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                                Perfeito!
                            </span>
                        )}
                    </span>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{sortedAttempt.time}</span>
                </div>
        </div>
    )
}

// Componente para criar um slot onde se pode soltar um sticker
export const DroppableSlot = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = {
        background: isOver ? "#d1fae5" : "",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 text-xs sm:text-sm"
        >
            {children}
        </div>
    );
};

export const ActiveStickerOverlay = ({ activeSticker }: { activeSticker: ISticker | null }) => {
    return (
        activeSticker ? (
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-gray-300 rounded-md flex items-center justify-center bg-white shadow-lg">
                <img
                    src={activeSticker.url}
                    alt={activeSticker.name}
                    className="max-w-full max-h-full p-1"
                />
            </div>
        ) : null
    );
}