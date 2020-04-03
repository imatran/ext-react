Ext.define('React.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'React.view.extjs.Hello',
        'React.view.react.React',
        'Ext.container.Container',
        'Ext.panel.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',
    bodyPadding: 10,

    items: [{
        xtype: 'container',
        flex: 1,
        layout: { type: 'hbox', align: 'stretch' },

        items: [{
            xtype: 'react',
            width: 700
        }, {
            xtype: 'hello',
            width: 260,
            margin: '0 0 0 8'
        }]
    }]
});
