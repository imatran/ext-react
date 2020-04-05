import { ADD_RECORD, REMOVE_RECORD } from '../constants';
import { SAVE_CHANGES, CANCEL_CHANGES } from '../constants';
import { DATA_CHANGED } from '../constants';
import { DataStore } from 'src/personnel/DataStore';

const initialState = {
    dataStore: new DataStore(),
    disableSave: true
};

export const reducer = (state = initialState, action) => {
    const dataStore = state.dataStore;

    const nextState = () => {
        return Object.assign({}, state, {
            disableSave: !dataStore.dirty()
        });
    };

    if(action.type === ADD_RECORD) {
        dataStore.add();
        return nextState();
    }

    if(action.type === REMOVE_RECORD) {
        dataStore.remove(action.record);
        return nextState();
    }

    if(action.type === SAVE_CHANGES) {
        dataStore.save();
        return nextState();
    }

    if(action.type === CANCEL_CHANGES) {
        dataStore.cancel();
        return nextState();
    }

    if(action.type === DATA_CHANGED) {
        return nextState();
    }

    return state;
};
