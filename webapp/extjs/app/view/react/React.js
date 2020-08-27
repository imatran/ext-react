/**
 * Created by atran on 23/01/20.
 */
Ext.define('React.view.react.React', {
    extend: 'Ext.container.Container',
    xtype: 'react',

    listeners: {
        boxready: (view) => {
            Ext.ReactDOM.render(
                [
                    Ext.React.createElement(Ext.react.DemoView, { key: 'demoview-1', ownerView: view })
                ],
                view.getEl().dom
            );
        }
    }
});
