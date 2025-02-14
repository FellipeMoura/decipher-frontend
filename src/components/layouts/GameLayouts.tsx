import { ISticker } from "../../types/Sticker";
import { useDraggable, useDroppable } from "@dnd-kit/core";


export const GameContainer: React.FC<{ children: React.ReactNode, title?: String }> = ({ children, title = "Jogo de Stickers" }) => {

    return (
        <div className="size-full border flex flex-col items-center p-8 pt-24 " >
            < header className="mb-8" >
                <h1 className="text-4xl font-bold text-white">{title}</h1>
            </header >
            {children}
        </div >
    );
}

const Field: React.FC<{ children: React.ReactNode, title: String }> = ({ children, title }) => {

    return (
        <section className=" w-full mb-12 flex flex-col items-center" >
            <h2 className="text-2xl text-white mb-4">{title}</h2>
            {children}
        </section>
    );
}

export const SlotsField: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Field title="Tabuleiro">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 p-2">
                {/* Adiciona uma largura mínima para evitar que os slots fiquem muito pequenos */}
              
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
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 p-2"
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
            className="w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-white hover:shadow-lg transition-shadow"
        >
            <img src={sticker.url} alt={sticker.name} className="max-w-full max-h-full" />
        </div>
    );
};
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
            className="w-20 h-20 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer bg-white"
        >
            {children}
        </div>
    );
};

export const ActiveStickerOverlay = ({ activeSticker }: { activeSticker: ISticker | null }) => {

    return (
        activeSticker ? (
            <div className="w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center bg-white">
                <img
                    src={activeSticker.url}
                    alt={activeSticker.name}
                    className="max-w-full max-h-full"
                />
            </div>
        ) : null
    );
}


