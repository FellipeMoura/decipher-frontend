import { useCallback, useEffect, useState } from "react";
import { StickerService } from "../../api/services/StickerService";
import { ISticker } from "../../types/Sticker";

export const Game = () => {
  const [stickers, setStickers] = useState<ISticker[]>([]);
  // Estado para os slots preenchidos – inicialmente, vazio
  const [slots, setSlots] = useState<(ISticker | null)[]>([null, null, null, null]);

  // Carrega os stickers do tema quando o componente é montado
  useEffect(() => {
    getStickers();
  }, []);

  const getStickers = useCallback(async () => {
    const themeId = 1;
    const result = await StickerService.findByTheme_Id(themeId);
    setStickers(result instanceof Error ? [] : result);
  }, []);

  // Exemplo de função para "preencher" um slot clicando no sticker (para fins de esboço)
  const handleStickerClick = (sticker: ISticker) => {
    // Procura o primeiro slot vazio e preenche com o sticker clicado
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      const emptyIndex = newSlots.findIndex((slot) => slot === null);
      if (emptyIndex !== -1) {
        newSlots[emptyIndex] = sticker;
      }
      return newSlots;
    });
  };

  // Exemplo de função para remover um sticker de um slot, se desejar
  const handleSlotClick = (index: number) => {
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      newSlots[index] = null;
      return newSlots;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Cabeçalho */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Jogo de Stickers</h1>
      </header>

      {/* Área do tabuleiro: slots para posicionar os stickers */}
      <section className="mb-12">
        <h2 className="text-2xl mb-4">Tabuleiro</h2>
        <div className="flex space-x-4">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="w-20 h-20 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer bg-white"
              onClick={() => handleSlotClick(index)}
            >
              {slot ? (
                <img
                  src={slot.url}
                  alt={slot.name}
                  className="max-h-full max-w-full"
                />
              ) : (
                <span className="text-gray-400">Slot {index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Área dos stickers disponíveis */}
      <section className="w-full max-w-3xl">
        <h2 className="text-2xl mb-4">Stickers Disponíveis</h2>
        <div className="grid grid-cols-4 gap-4">
          {stickers.map((sticker) => (
            <div
              key={sticker.id}
              className="w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-white hover:shadow-lg transition-shadow"
              onClick={() => handleStickerClick(sticker)}
            >
              <img
                src={sticker.url}
                alt={sticker.name}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
