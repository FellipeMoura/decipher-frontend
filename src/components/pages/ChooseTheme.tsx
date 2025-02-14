import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameService } from '../../api/services/GameService';

export const ChooseTheme = ({ handleOnStartGame }: { handleOnStartGame: (resp: any) => void }) => {
    const [themeId, setThemeId] = useState<number | null>(null);
    const [levelId, setLevelId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleStartGame = () => {
        if (themeId && levelId) {
            GameService.create({ themeId, levelId })
                .then((resp) => {
                    if (resp) {
                        if (resp instanceof Error) {
                            alert(resp.message)
                        } else {
                            handleOnStartGame(resp);
                            navigate('/jogar');
                        }
                    }
                })
        }

    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Escolha o Tema e o Nível</h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Tema</label>
                    <select
                        onChange={(e) => setThemeId(Number(e.target.value))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                        <option value={1}>Naruto</option>
                        <option value={2}>One Piece</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Nível</label>
                    <select
                        onChange={(e) => setLevelId(Number(e.target.value))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                        <option value={1}>Fácil</option>
                        <option value={2}>Médio</option>
                        <option value={3}>Difícil</option>
                    </select>
                </div>
                <button
                    onClick={handleStartGame}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Iniciar Jogo
                </button>
            </div>
        </div>
    );
};