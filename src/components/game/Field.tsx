import { useDispatch, useSelector } from 'react-redux';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { ISticker } from '../../types/Sticker';
import { setStickers, updateSlots, setActiveSticker, resetAttempt, insertAttempt, setTimes } from '../../redux/game/actions';
import { ActiveStickerOverlay, AvailableField, DraggableSticker, DroppableSlot, GameContainer, SlotsField } from '../layouts/GameLayouts';
import { RootState } from '../../redux/store';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { AttemptService } from '../../api/services/AttemptService';
export const Field = () => {
    const dispatch = useDispatch();
    const { stickers, slots, activeSticker, correctSequence, gameId, attempts, startTime, currentTime } = useSelector((state: RootState) => state.game);

    // Carrega os stickers do tema ao montar o componente


    const handleDragStart = (event: any) => {
        const { active } = event;
        const sticker =
            stickers.find((s: ISticker) => s.id.toString() === active.id) ||
            slots.find((s: ISticker) => s && s.id.toString() === active.id) ||
            null;
        dispatch(setActiveSticker(sticker));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // Se o sticker for solto sobre um slot
        if (over && over.id.toString().startsWith('slot-')) {
            const slotIndexEnd = parseInt(over.id.toString().split('-')[1]); // Índice do slot de destino

            // Verifica se o sticker já está em algum slot
            const isStickerInSlot = slots.some((slot: ISticker | null) => slot?.id === Number(active.id));

            if (!isStickerInSlot) {
                // Se o sticker não está em nenhum slot, move-o para o slot de destino
                const newSlots = [...slots];

                // Se o slot de destino estiver vazio, move o sticker para ele
                if (!newSlots[slotIndexEnd] && activeSticker) {
                    newSlots[slotIndexEnd] = activeSticker;
                    dispatch(updateSlots(newSlots));
                    dispatch(setStickers(stickers.filter((s: ISticker) => s.id !== activeSticker.id)));
                }
                // Se o slot de destino estiver ocupado, move o sticker para ele e devolve o sticker antigo para a lista de stickers disponíveis
                else if (activeSticker) {
                    const newStickers = [...stickers, newSlots[slotIndexEnd]]; // Adiciona o sticker do slot de destino de volta à lista de stickers
                    newSlots[slotIndexEnd] = activeSticker; // Move o sticker ativo para o slot de destino
                    dispatch(updateSlots(newSlots));
                    dispatch(setStickers(newStickers.filter((s: ISticker) => s.id !== activeSticker.id)));
                }
            } else {
                // Se o sticker já está em um slot, troca os valores entre os slots
                const sourceSlotIndex = slots.findIndex((slot: ISticker | null) => slot?.id === Number(active.id)); // Índice do slot de origem
                const newSlots = [...slots];

                // Troca os valores dos slots
                const temp = newSlots[sourceSlotIndex];
                newSlots[sourceSlotIndex] = newSlots[slotIndexEnd];
                newSlots[slotIndexEnd] = temp;

                dispatch(updateSlots(newSlots));
            }
        }
        // Se o sticker for solto na área disponível
        else {
            const isStickerInAvaliableStickers = stickers.some((s: ISticker | null) => s && s.id === Number(activeSticker.id))
            if (over && over.id === 'available' && !isStickerInAvaliableStickers) {

                const newSlots = slots.map((slot: ISticker | null) =>
                    slot && slot.id.toString() === active.id ? null : slot
                );
                dispatch(updateSlots(newSlots));
                if (activeSticker) {
                    dispatch(setStickers([...stickers, activeSticker]));
                }
            }
        }

        dispatch(setActiveSticker(null));
    };



    const handleSubmitAttempt = () => {
        const sequenceAttempt = slots.map((slot: ISticker) => slot.id);

        const correctCount = sequenceAttempt.reduce((count: any, sticker: ISticker, index: number) => {
            return count + (sticker === correctSequence[index] ? 1 : 0);
        }, 0);
        const newCurrentTime = dayjs();

        const diffSeconds =  newCurrentTime.diff(currentTime || newCurrentTime, 'second');

        // Formata o tempo corretamente para "HH:mm:ss"
        const attemptTime = dayjs("2020-0-01T00:00:00").add(diffSeconds, 'second').format('HH:mm:ss');
        console.log(currentTime, newCurrentTime.format('MM-DD HH:mm:ss'))
        const newAttempts = [...attempts, { sequence: sequenceAttempt, correctCount, time: attemptTime }];

        const createBody = { gameId, sequenceAttempt, correctCount, attemptTime }
       
        AttemptService.create(createBody)
            .then((resp) => {
                if (resp) {
                    if (resp instanceof Error) {
                        alert(resp.message)
                    } else {
                        if (resp.isCorrectSequence) {
                            alert("Parabéns! Você acertou a sequência!");
                            // dispatch(setStickers(correctSequence));
                        } else {
                            dispatch(setTimes({ startTime: startTime || attemptTime, currentTime: newCurrentTime.format('YYYY-MM-DD HH:mm:ss') }));
                            dispatch(insertAttempt({ attempts: newAttempts, lastAttemptTime: attemptTime }));
                            alert("Você errou a sequência. Tente novamente!");
                        }

                    }
                }
            })

    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <GameContainer>
                {/* Área dos slots */}
                <SlotsField>
                    {slots.map((slot: ISticker | null, index: number) => (
                        <DroppableSlot key={index} id={`slot-${index}`}>
                            {slot ? (
                                <DraggableSticker sticker={slot} />
                            ) : (
                                <span className="text-gray-400">Slot {index + 1}</span>
                            )}
                        </DroppableSlot>
                    ))}
                </SlotsField>

                {/* Renderização condicional */}
                {!slots.every((slot: ISticker | null) => slot) ? (
                    // Se todos os slots estiverem preenchidos, exibe a área de stickers disponíveis
                    <AvailableField>
                        {stickers.map((sticker: ISticker) => (
                            <DraggableSticker key={sticker.id} sticker={sticker} />
                        ))}
                    </AvailableField>
                ) : (
                    // Se algum slot estiver vazio, exibe os botões de ação
                    <div className="flex space-x-4 mt-8">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => dispatch(resetAttempt())}
                        >
                            Limpar Slots
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAttempt}
                        >
                            Fazer Tentativa
                        </Button>
                    </div>
                )}

                {/* Overlay para o sticker sendo arrastado */}
                <DragOverlay>
                    <ActiveStickerOverlay activeSticker={activeSticker} />
                </DragOverlay>
            </GameContainer>
        </DndContext>
    );
};