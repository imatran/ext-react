import { REMOVE_RECORD } from '../constants';

const forbidden = /1010/;

export const forbiddenNumber = ({ dispatch }) => {
    return (next) => {
        return (action) => {
            if(action.type === REMOVE_RECORD) {
                if(action.record.get('phone').match(forbidden)) {
                    Ext.Msg.alert('Forbidden', 'Cannot Remove');
                    return dispatch({ type: 'CANNOT_REMOVE' });
                }
            }

            return next(action);
        }
    }
};