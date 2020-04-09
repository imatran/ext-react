import data from './data.json';

Ext.require([
    'Ext.data.TreeStore',
    'Ext.data.TreeModel'
]);

export class DataStore {
    constructor() {
        const model = Ext.create('Ext.data.TreeModel', {
            fields: [ 'name' ]
        });

        this.store = Ext.create('Ext.data.TreeStore', {
            model: model,
            root: data.rootNode
        });

        this.store.commitChanges();
        return this;
    }

    save() {
        this.store.commitChanges();
    }

    cancel() {
        this.store.rejectChanges();
    }

    dirty() {
        return this.store.getModifiedRecords().length !== 0 || this.store.getRemovedRecords().length !== 0;
    }
}
