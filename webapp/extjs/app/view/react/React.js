/**
 * Created by atran on 23/01/20.
 */
Ext.define('React.view.react.React', {
    extend: 'Ext.container.Container',
    xtype: 'react',

    listeners: {
        boxready: (view) => {
            const element = view.getEl().dom;

            Ext.ReactDOM.render(
                [
                    Ext.React.createElement(Ext.react.DemoView, { key: 'demoview-1', ownerView: view })
                ],
                element
            );

            view.on({
                //unmount component when owner view is destroyed
                destroy: () => {
                    Ext.ReactDOM.unmountComponentAtNode(element);
                }
            });
        }
    }
});
