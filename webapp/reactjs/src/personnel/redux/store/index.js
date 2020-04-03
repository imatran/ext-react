import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers';
import { forbiddenNumber } from '../middleware';

export const store = createStore(
    reducer,
    applyMiddleware(forbiddenNumber)
);