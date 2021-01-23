/**
 * Created by atran on 2020-03-01.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

Ext.require([
    'Ext.Component',
    'Ext.container.Container'
]);

export default class ExtComponent extends React.Component {

    // =========================== //
    // === Start React methods === //
    // =========================== //
    constructor(props) {
        super(props);
        this.extComponentRef = React.createRef();
        this.reactComponents = [];
    }

    render() {
        return <div ref={this.extComponentRef} />
    }

    componentDidMount() {
        this.extComponent = this.createExtComponent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateComponentProps(this.extComponent, this.props);
    }

    componentWillUnmount() {
        this.reactComponents.forEach(item => {
            if(item.el && item.el.dom) {
                ReactDOM.unmountComponentAtNode(item.el.dom);
            }
        });
    }

    // ============================ //
    // === Start Helper methods === //
    // ============================ //
    createExtComponent() {
        return Ext.create(
            this.getComponentClass(),
            Ext.apply(this.getComponentConfig(), {
                renderTo: this.extComponentRef.current
            })
        );
    }

    getComponentClass() {
        return Ext.Component;
    }

    getComponentConfig() {
        const config = Ext.Object.merge({}, this.props);

        //map React component props to ExtJS component props
        this.mapComponentProps(config);

        //map React 'onEvents' listeners to ExtJS component listeners
        this.mapComponentListeners(config);

        if(this.props.children) {
            const children = React.Children.toArray(this.props.children);
            config.items = this.createComponentItems(children);

            if(config.items) {
                this.mapComponentItems(config);
            }
        }

        return config;
    }

    updateComponentProps(component, props) {
        Ext.Object.each(props, prop => {
            const setter = this.makeSetter(prop);

            if(component[setter]) {
                if(component[prop] !== props[prop]) {
                    component[setter](props[prop]);
                }
            }
        });

        this.updateChildrenProps(component, props);
        this.updateComponentItems(component, props);
    }

    updateChildrenProps(component, props) {
        const children = props.children ? React.Children.toArray(props.children) : [];
        const items = Ext.Array.merge(
            component.items && component.items.items || [],
            component.dockedItems && component.dockedItems.items || []
        );

        Ext.Array.each(items, (item) => {
            const child = children[item.key];

            if(child) {
                switch(true) {
                    case child.type.prototype instanceof ExtComponent:
                        this.updateComponentProps(item, child.props);
                        break;

                    case child.type.prototype instanceof React.Component:
                        this.renderReactComponent(child, item);
                        break;
                }
            }
        });
    }

    createComponentItems(children, items) {
        items = items || [];

        Ext.Array.each(children, (child, index) => {
            let item = null;

            if(child.type && child.props) {
                switch(true) {
                    case child.type.prototype instanceof ExtComponent:
                        const me = new child.type(Ext.Object.merge({key: index}, child.props));
                        item = me.createExtComponent();
                        break;

                    case child.type.prototype instanceof React.Component:
                    case typeof child.props.children !== 'string':
                        item = Ext.create('Ext.container.Container', { layout: 'fit', key: index, });
                        this.renderReactComponent(child, item);
                        break;
                }
            }

            if(item === null) {
                item = Ext.create('Ext.Component', {
                    html: ReactDOMServer.renderToString(child)
                });
            }

            item && items.push(item);
        });

        return items;
    }

    updateComponentItems(component, props) {
        const children = props.children ? React.Children.toArray(props.children) : [];

        if(component.items && component.items.length !== children.length) {
            const config = {};
            config.items = this.createComponentItems(children);

            if(config.items) {
                this.mapComponentItems(config);
            }

            if(config.items) {
                this.removeComponentItems(component);
                component.add(config.items);
            } else {
                if(children.length === 0 && component.items.length === 1) { //last item
                    this.removeComponentItems(component);
                }
            }
        }
    }

    removeComponentItems(component) {
        if(component.items && component.items.length > 0) {
            component.items.each(item => {
                if(item.el && item.el.dom) {
                    ReactDOM.unmountComponentAtNode(item.el.dom);
                }

                component.remove(item);
            });
        }
    }

    mapComponentItems(config) {
        const components = config.items;

        //filter grid columns
        const columns = Ext.Array.reduce(components, (items, item) => {
            if(item instanceof Ext.grid.column.Column) {
                items.push(item);

                //create editor of type ExtComponent
                const editor = item.editor;
                if(editor && editor.type && editor.type.prototype instanceof ExtComponent) {
                    const me = new editor.type(editor.props);
                    item.editor = me.createExtComponent();
                }
            }
            return items;
        }, []);

        //filter docked items
        const dockedItems = Ext.Array.reduce(components, (items, item) => {
            const isColumn = Ext.Array.findBy(columns, column => { return column.id === item.id; }) !== null;
            !isColumn && item['dock'] && items.push(item);
            return items;
        }, []);

        //filter other items
        const items = Ext.Array.reduce(components, (items, item) => {
            const isColumn = Ext.Array.findBy(columns, column => { return column.id === item.id; }) !== null;
            const isDocked = Ext.Array.findBy(dockedItems, i => { return i.id === item.id; }) !== null;
            !isColumn && !isDocked && items.push(item);
            return items;
        }, []);

        config.columns = !Ext.isEmpty(columns) ? columns : null;
        config.dockedItems = !Ext.isEmpty(dockedItems) ? dockedItems : null;
        config.items = !Ext.isEmpty(items) ? items : null;
    }

    mapComponentProps(config) {
        const props = {
            className: 'cls'
        };

        Ext.Object.each(props, (key, value) => {
            if(config[key]) {
                config[value] = config[key];
                delete config[key];
            }
        });
    }

    mapComponentListeners(config) {
        Ext.Object.each(config, (key, value) => {
            let match = key.match(/^on([A-Z][a-zA-Z]*)$/);

            if(match) {
                delete config[match.input];

                const listener = match[1].toLowerCase();
                config.listeners = Ext.Object.merge(config.listeners || {}, {
                    [listener]: value
                });
            }
        });
    }

    renderReactComponent(child, item) {
        if(item.el && item.el.dom) {
            this.reactComponents.push(item);
            ReactDOM.render(child, item.el.dom);
        } else {
            item.on('boxready', () => {
                this.reactComponents.push(item);
                ReactDOM.render(child, item.el.dom);
            });
        }
    }

    makeSetter(prop) {
        return `set${prop.replace(/^\w/, c => c.toUpperCase())}`;
    }

}