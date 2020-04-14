/**
 * Created by atran on 2018-03-14.
 */
Ext.define('React.widgets.MenuCombo', {
    extend: 'Ext.form.field.Picker',
    xtype: 'menucombo',

    requires: [
        'React.widgets.MenuTool',
        'Ext.data.Model',
        'Ext.form.field.Picker',
        'Ext.menu.Menu'
    ],

    config: {
        /**
         * @cfg {String|Array|Ext.data.Store} store
         */
        store: null
    },

    /**
     * Initialize object listeners.
     *
     * These events are configured for this component:
     *    - beforeshowmenu: used iterate through the menu items, e.g. disable menu items.
     *          usage: beforeshowmenu: (combo, menu) => { ... }
     *
     *    - beforemenuitemclick: used to add logic before the menu item is clicked.
     *          usage: beforeitemclick: (combo, item) => { ... }
     *
     *    - menuitemclick: used to add logic when the menu item is clicked.
     *          usage: menuitemclick: (combo, item) => { ... }
     */
    initComponent: function() {
        const me = this;

        me.on({
            expand: () => { me.getPicker().fireEvent('click'); },
            beforemenuitemclick: (combo, item) => { return me.onBeforeMenuItemClick(combo, item); }
        });

        me.callParent(arguments);
    },

    /**
     * Binds the tree store object from config.
     *
     * @param store
     */
    setStore: function(store) {
        const me = this,
              root = store.getRoot(),
              picker = me.getPicker();

        const menu = me.buildMenu(root.childNodes);
        picker.setMenu(menu);
    },

    /**
     * Implementation to create the picker which is a custom MenuTool.
     *
     * @returns {React.widgets.MenuTool}
     */
    createPicker: function() {
        const me = this,
              picker = Ext.create('React.widgets.MenuTool', {
                  floating: true,
                  height: 0
              });

        picker.on('beforeshowmenu', (menu) => {
            return me.fireEvent('beforeshowmenu', me, menu);
        });

        return picker;
    },

    /**
     * Handler for click event when menu item is clicked.
     * This handler also check for disable menu items via the 'beforemenuitemclick' event.
     *
     * @param menuitem
     */
    onMenuItemClick: function(menuitem) {
        const me = this,
              item = Ext.create('Ext.data.Model', menuitem);

        if(me.fireEvent('beforemenuitemclick', me, item) !== false) {
            if (menuitem.valueSetter) {
                menuitem.valueSetter(me);
            } else {
                me.setValue(item.get('value') || item.get('text'));
            }
            me.fireEvent('menuitemclick', me, item);
        }
    },

    /**
     * Handler for before menu item is clicked.
     * Essentially this handler return false if the menu item is disabled.
     *
     * @param combo
     * @param record
     * @returns {*|boolean}
     */
    onBeforeMenuItemClick: function(combo, record) {
        let menuitem = null;

        let findMenuItem = (menu) => {
            if(!menu) return null;

            for(let mi of menu.items.items) {
                //find menu item that matches type and value
                if(mi.type === record.get('type') && mi.value === record.get('value')) {
                    menuitem = mi;
                    break;
                }

                //recursively check for sub menu items
                findMenuItem(mi.menu);
            }
        };

        findMenuItem(combo.getPicker().menu);
        return menuitem && !menuitem.isDisabled();
    },

    /**
     * Creates the Ext.menu.Menu structure from the given tree node.
     *
     * @param nodes
     * @returns {Ext.menu.Menu}
     */
    buildMenu: function(nodes) {
        let menu = Ext.create('Ext.menu.Menu', {
                plain: true,
                bodyPadding: 1,
                minHeight: 34
            });

        for(let node of nodes) {
            menu.add(this.buildMenuItem(node));
        }

        return menu;
    },

    /**
     * Creates the Ext.menu.Item for the given tree node, recursively creates sub-menus.
     *
     * @param node
     * @returns {{text, type, value, listeners: Array}}
     */
    buildMenuItem: function(node) {
        let me = this,
            menuitem1 = { text: node.get('text'), type: node.get('type'), value: node.get('value'), listeners: [] },
            menuitem = Object.assign({}, menuitem1, node.get('more'));

        delete menuitem.valueSetter;
        if(node.hasChildNodes()) {
            menuitem['menu'] = this.buildMenu(node.childNodes);
        } else {
            menuitem.listeners.push({
                click: {
                    element: 'el',
                    fn: () => {
                        me.onMenuItemClick({ text: node.get('text'), type: node.get('type'), value: node.get('value'), valueSetter: node.get('more') && node.get('more').valueSetter });
                    }
                }
            });
        }

        return menuitem;
    }
});