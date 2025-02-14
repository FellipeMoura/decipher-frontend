import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import gameReducer from './game/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export default rootReducer;