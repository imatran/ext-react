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
        layout: { type: 'hbox', align: 'stretch' },
        flex: 1,
        scrollable: true,

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
