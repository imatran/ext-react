import { ADD_RECORD, REMOVE_RECORD } from '../constants';
import { SAVE_CHANGES, CANCEL_CHANGES } from '../constants';
import { DataStore } from 'src/personnel/DataStore';

const initialState = {
    dataStore: new DataStore(),
    disableSave: true
};

export const reducer = (state = initialState, action) => {
    const dataStore = state.dataStore;
    const ownerGrid = dataStore.ownerGrid;

    const selectLastRecord = () => {
        const record = dataStore.last();
        record && ownerGrid.ensureVisible(record, {select: true, animate: false});
        ownerGrid.getView().refresh();
    };

    const nextState = () => {
        return Object.assign({}, state, {
            disableSave: !dataStore.dirty()
        });
    };

    if(action.type === ADD_RECORD) {
        dataStore.add();
        selectLastRecord();
        return nextState();
    }

    if(action.type === REMOVE_RECORD) {
        action.record.drop();
        return nextState();
    }

    if(action.type === SAVE_CHANGES) {
        dataStore.save();
        selectLastRecord();
        return nextState();
    }

    if(action.type === CANCEL_CHANGES) {
        dataStore.cancel();
        selectLastRecord();
        return nextState();
    }

    return state;
};