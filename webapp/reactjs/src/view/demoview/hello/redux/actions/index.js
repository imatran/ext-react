import { UPDATE_NAME, RESET_BAD_NAME } from '../constants';

export const updateName = (name) => {
    return { type: UPDATE_NAME, name }
};

export const resetBadName = () => {
    return { type: RESET_BAD_NAME }
};