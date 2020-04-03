import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/index';
import { catchBadName } from '../middleware';

export const store = createStore(
    reducer,
    applyMiddleware(catchBadName)
);