Ext.define('React.widgets.MenuTool', {
    extend: 'Ext.panel.Tool',
    xtype: 'menutool',

    requires: [
        'Ext.menu.Manager'
    ],

    config: {
        menu: null,
        hideOneMenu: false
    },

    cls: 'menu-tool',
    menuAlign: 'tl-bl?',
    onMouseDown: Ext.emptyFn,

    initComponent: function() {
        const me = this;

        me.callParent(arguments);
        me.on('click', me.showMenu, me);
        me.on('render', me.manageTooltip, me, {single: true});
    },

    doDestroy: function() {
        const me = this,
              menu = me.getMenu();

        menu && Ext.destroy(menu);
        me.callParent(arguments);
    },

    setMenu: function(menu) {
        const me = this;

        if (menu) {
            const instanced = menu.isMenu;

            menu = Ext.menu.Manager.get(menu, {
                ownerCmp: me
            });

            menu.on('boxready', () => {
                menu.setMinHeight(menu.getHeight() + 1);
            });

            menu.setOwnerCmp(me, instanced);
            menu.menuClickBuffer = 250;

            me.menu = menu;
        }
    },

    showMenu: function() {
        const me = this,
              menu = me.getMenu();

        if(menu) {
            if(me.fireEvent('beforeshowmenu', menu) !== false) {
                if (menu.isVisible()) {
                    menu.hide();

                } else {
                    if(me.hideOneMenu && menu.items.length === 1) {
                        menu.items.get(0).handler(menu.items.get(0));
                    } else {
                        menu.showBy(me.el, me.menuAlign);
                    }
                }
            }
        }
    },

    manageTooltip: function() {
        const me = this,
              menu = me.getMenu(),
              tooltip = Ext.tip.QuickTipManager.getQuickTip(),
              showtip = () => { return !menu || menu.isHidden(); };

        menu && menu.on({
            hide: () => {
                tooltip.un('beforeshow', showtip);
            },
            show: () => {
                tooltip.on('beforeshow', showtip)
            }
        });
    }
});