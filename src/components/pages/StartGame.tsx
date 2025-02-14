import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GameService } from '../../api/services/GameService';
import { startGame } from '../../redux/game/actions';
import {ChooseTheme} from './ChooseTheme';
import {ActiveGamePrompt} from './ActiveGamePrompt';
import { LoadingState } from '../layouts/StartGameLayout';

export const StartGame = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isActiveGame, setIsActiveGame] = useState(false);

  useEffect(() => {
        GameService.getActiveGame()
            .then((resp) => {
                setIsLoading(false)
                if (resp) {
                    if (resp instanceof Error) {
                        alert(resp.message)
                    } else {
                        dispatch(startGame(resp));
                        setIsActiveGame(true);
                       
                    }
                }

            })

    }, []);

    if (isLoading) {
        return <LoadingState />;
    }

    if (isActiveGame) {
        return <ActiveGamePrompt />;
    }

    return <ChooseTheme />;
};