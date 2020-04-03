Ext.require([
    'Ext.data.TreeStore',
    'Ext.data.TreeModel'
]);

export class Store {

    static create(config) {
        return Ext.create(
            'Ext.data.TreeStore',
            Ext.Object.merge(config, {
                model: Store.model(),
                root: Store.data()
            })
        );
    }

    static model() {
        return Ext.create(
            'Ext.data.TreeModel',
            {
                fields: [
                    'name'
                ]
            }
        )
    }

    static data() {
        return {
                name: 'Ext JS',
                expanded: true,
                children: [
                    {
                        name: 'app',
                        children: [
                            {leaf: true, name: 'Application.js'}
                        ]
                    },
                    {
                        name: 'button',
                        expanded: true,
                        children: [
                            {leaf: true, name: 'Button.js'},
                            {leaf: true, name: 'Cycle.js'},
                            {leaf: true, name: 'Split.js'}
                        ]
                    },
                    {
                        name: 'container',
                        children: [
                            {leaf: true, name: 'ButtonGroup.js'},
                            {leaf: true, name: 'Container.js'},
                            {leaf: true, name: 'Viewport.js'}
                        ]
                    },
                    {
                        name: 'core',
                        children: [
                            {
                                name: 'dom',
                                children: [
                                    {leaf: true, name: 'Element.form.js'},
                                    {leaf: true, name: 'Element.static-more.js'}
                                ]
                            }
                        ]
                    },
                    {
                        name: 'dd',
                        children: [
                            {leaf: true, name: 'DD.js'},
                            {leaf: true, name: 'DDProxy.js'},
                            {leaf: true, name: 'DDTarget.js'},
                            {leaf: true, name: 'DragDrop.js'},
                            {leaf: true, name: 'DragDropManager.js'},
                            {leaf: true, name: 'DragSource.js'},
                            {leaf: true, name: 'DragTracker.js'},
                            {leaf: true, name: 'DragZone.js'},
                            {leaf: true, name: 'DragTarget.js'},
                            {leaf: true, name: 'DragZone.js'},
                            {leaf: true, name: 'Registry.js'},
                            {leaf: true, name: 'ScrollManager.js'},
                            {leaf: true, name: 'StatusProxy.js'}
                        ]
                    },
                    {
                        name: 'core',
                        children: [
                            {leaf: true, name: 'Element.alignment.js'},
                            {leaf: true, name: 'Element.anim.js'},
                            {leaf: true, name: 'Element.dd.js'},
                            {leaf: true, name: 'Element.fx.js'},
                            {leaf: true, name: 'Element.js'},
                            {leaf: true, name: 'Element.position.js'},
                            {leaf: true, name: 'Element.scroll.js'},
                            {leaf: true, name: 'Element.style.js'},
                            {leaf: true, name: 'Element.traversal.js'},
                            {leaf: true, name: 'Helper.js'},
                            {leaf: true, name: 'Query.js'}
                        ]
                    },
                    {leaf: true, name: 'Action.js'},
                    {leaf: true, name: 'Component.js'},
                    {leaf: true, name: 'Editor.js'},
                    {leaf: true, name: 'Img.js'},
                    {leaf: true, name: 'Layer.js'},
                    {leaf: true, name: 'LoadMask.js'},
                    {leaf: true, name: 'ProgressBar.js'},
                    {leaf: true, name: 'Shadow.js'},
                    {leaf: true, name: 'ShadowPool.js'},
                    {leaf: true, name: 'ZIndexManager.js'}
                ]
        };
    }
}