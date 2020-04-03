Ext.require([
    'Ext.data.ArrayStore'
]);

export class AgeGroups {
    constructor() {
        this.store = Ext.create('Ext.data.ArrayStore', {
            fields: ['value'],
            data: [
                ['20-29'],
                ['30-39'],
                ['40-49'],
                ['50-59']
            ]
        });

        this.store.commitChanges();
        return this;
    }
}