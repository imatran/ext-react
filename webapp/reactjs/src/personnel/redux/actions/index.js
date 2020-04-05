import { ADD_RECORD, REMOVE_RECORD } from '../constants';
import { SAVE_CHANGES, CANCEL_CHANGES } from '../constants';
import { DATA_CHANGED } from '../constants';

export const addRecord = (record) => {
    return { type: ADD_RECORD, record }
};

export const removeRecord = (record) => {
    return { type: REMOVE_RECORD, record }
};

export const saveChanges = () => {
    return { type: SAVE_CHANGES }
};

export const cancelChanges = () => {
    return { type: CANCEL_CHANGES }
};

export const dataChanged = () => {
    return { type: DATA_CHANGED }
};
