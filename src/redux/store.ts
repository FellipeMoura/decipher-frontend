import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import logger from 'redux-logger';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
