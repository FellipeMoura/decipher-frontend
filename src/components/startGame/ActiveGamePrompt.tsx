import { useNavigate } from 'react-router-dom';
import { GameService } from '../../api/services/GameService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../redux/game/actions';

export const ActiveGamePrompt = ({ setIsActiveGame }: { setIsActiveGame: (isActiveGame: boolean) => void }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameId } = useSelector((state: RootState) => state.game);
    const handleContinueGame = () => {
        navigate('/jogar');
    };

    useEffect(() => {
        GameService.getActiveGame()

    }, []);

    const handleNewGame = async () => {
        GameService.endGame(gameId)
            .then((resp) => {
                if (resp) {
                    dispatch(resetGame());
                    navigate('/iniciar-jogo');
                    setIsActiveGame(false);
                }else{
                    alert('Erro ao finalizar o jogo')
                }
            })

        // navigate('/choose-theme'); // Redireciona para a escolha de tema e nível  
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Jogo Ativo Encontrado</h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <p className="text-lg mb-6">Você já tem um jogo em andamento. Deseja continuar ou iniciar um novo jogo?</p>
                <div className="flex space-x-4">
                    <button
                        onClick={handleContinueGame}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                        Continuar Jogo
                    </button>
                    <button
                        onClick={handleNewGame}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                        Iniciar Novo Jogo
                    </button>
                </div>
            </div>
        </div>
    );
};