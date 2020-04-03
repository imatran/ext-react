/**
 * Created by atran on 2020-04-01.
 */
Ext.define('React.view.extjs.HelloModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hello',

    requires: [
        'Ext.data.Store'
    ],

    stores: {
        comboStore: {
            type: 'store',
            fields: ['value'],
            data: [
                ['Jane Doe'],
                ['John Doe'],
                ['World']
            ]
        }
    },

    data: {
        helloName: 'World',
        helloInput: null,
        comboValue: null,
        showLabel: true,
        boldLabel: false
    }
});