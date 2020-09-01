Ext.require([
    'Ext.data.Store'
]);

export class Store {

    static create() {
        return Ext.create('Ext.data.Store', {
            fields: ['value'],
            data: [
                ['John Doe'],
                ['Jane Doe'],
                ['World']
            ]
        });
    }
}