import { UPDATE_NAME, BAD_NAME, RESET_BAD_NAME } from '../constants';

const initialState = {
    helloName: 'World',
    badName: null
};

export const reducer = (state = initialState, action) => {
    if(action.type === UPDATE_NAME) {
        return Object.assign({}, state, {
            helloName: action.name
        });
    }

    if(action.type === BAD_NAME) {
        return Object.assign({}, state, {
            badName: action.name
        });
    }

    if(action.type === RESET_BAD_NAME) {
        return Object.assign({}, state, {
            badName: null
        });
    }

    return state;
};