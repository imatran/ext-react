import { UPDATE_NAME } from '../constants';

const forbidden = /andy/i;

export const catchBadName = ({ dispatch }) => {
    return (next) => {
        return (action) => {
            if(action.type === UPDATE_NAME) {
                if(action.name.match(forbidden)) {
                    return dispatch({ type: 'BAD_NAME', name: action.name });
                }
            }

            return next(action);
        }
    }
};