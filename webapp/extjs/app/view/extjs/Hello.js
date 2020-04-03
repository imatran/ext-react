/**
 * Created by atran on 2020-04-01.
 */
Ext.define('React.view.extjs.Hello', {
    extend: 'Ext.Container',
    xtype: 'hello',

    requires: [
        'React.view.extjs.HelloController',
        'React.view.extjs.HelloModel',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Radio',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    controller: 'hello',
    viewModel: 'hello',

    cls: 'hello',

    items: [{
        xtype: 'container',
        cls: 'main border-panel',
        layout: { type: 'vbox', align: 'stretch' },

        items: [{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'container',
                flex: 1,
                items: [{
                    xtype: 'label',
                    bind: {
                        text: 'Hello {helloName} 1!',
                        hidden: '{!showLabel}'
                    }
                }]
            },{
                xtype: 'checkbox',
                hideLabel: true,
                checked: true,
                flex: 1,
                handler: 'onHideLabel',
                bind: {
                    boxLabel: '{showLabel ? "Hide" : "Show"}'
                }
            }]
        },{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'label',
                flex: 1,
                bind: {
                    text: 'Hello {helloName} 2!',
                    style: {
                        fontWeight: '{boldLabel ? 700 : 300}'
                    }
                }
            },{
                xtype: 'radio',
                hideLabel: true,
                flex: 1,
                bind: {
                    boxLabel: '{boldLabel ? "Regular" : "Bold"}',
                    value: '{boldLabel}'
                },
                listeners: {
                    click: {
                        fn: 'onBoldLabel',
                        element: 'el'
                    }
                }
            }]
        },{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'label',
                flex: 1,
                bind: {
                    text: 'Hello {comboValue || helloName} 3!'
                }
            },{
                xtype: 'combobox',
                displayField: 'value',
                flex: 1,
                queryMode: 'local',
                editable: false,
                bind: {
                    store: '{comboStore}'
                },
                listeners: {
                    change: 'onComboChange'
                }
            }]
        },{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '10 0 0 0',
            items: [{
                xtype: 'label',
                flex: 1,
                text: 'Change Name:'
            },{
                xtype: 'textfield',
                flex: 1,
                listeners: {
                    change: 'onNameChange'
                }
            }]
        },{
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '10 0 0 0',
            items: [{
                xtype: 'container',
                flex: 1,
                items: [{
                    xtype: 'button',
                    text: 'Change Name:',
                    handler: 'onInputSubmit',
                    bind: {
                        disabled: '{!helloInput}'
                    }
                }]
            },{
                xtype: 'textfield',
                flex: 1,
                bind: {
                    value: '{helloInput}'
                },
                listeners: {
                    change: 'onInputChange'
                }
            }]
        }]
    }]
});