/**
 * Created by atran on 2018-06-12.
 */
Ext.define('React.widgets.NumberPaging', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'numberpagingtoolbar',

    requires: [
        'Ext.form.Label'
    ],

    store: null,
    height: 32,
    padding: 0,
    cls: 'number-paging',

    initComponent: function() {
        let me = this;

        me.callParent(arguments);
        me.setStore();
    },

    setStore: function(store) {
        let me = this;

        me.store = store;
        if(me.store) {
            me.removeAll();
            me.add(me.getPagingItems());

            me.mon(me.store, 'datachanged', (store) => {
                if(store.getTotalCount() <= store.getPageSize()) {
                    me.hide();
                } else {
                    me.show();
                    me.removeAll();
                    me.add(me.getPagingItems());
                }
            });
        }
    },

    getPagingItems: function() {
        let me = this,
            store = me.store,
            pages = Math.ceil(store.getTotalCount() / store.getPageSize()),
            current = store.currentPage,
            items = [];

        if(pages > 1) {
            //add prev button
            if(current > 1) {
                items.push(me.getLink(current - 1, '<'));
            } else {
                items.push(me.getEndNav('<'));
            }

            //add up to six pages with no special formatting
            if(pages <= 6) {
                for(let i of [1, 2, 3, 4, 5, 6]) {
                    if(i <= pages) {
                        items.push(me.getLink(i));
                    }
                }
            } else {
                //add first four pages
                if(current < 4) {
                    for(let i of [1, 2, 3, 4]) {
                        items.push(me.getLink(i));
                    }
                }

                //add pages for page 4+
                if(current >= 4) {
                    //add first page
                    items.push(me.getLink(1));

                    //add dots after first page
                    if(current > 4) {
                        items.push(me.getDots());
                    }

                    //add prev skipping 10
                    let prev = Math.ceil((current - 3) / 10) * 10;
                    if(prev > 10) {
                        items.push(me.getLink(prev - 10));
                        items.push(me.getDots());
                    }

                    //add two pages before selected page
                    for(let i of [1, 2, 3]) {
                        items.push(me.getLink(current + i - 3));
                    }

                    //add two pages after selected page
                    for(let i of [1, 2]) {
                        if(current + i < pages) {
                            items.push(me.getLink(current + i));
                        }
                    }
                }

                //add next skipping 10
                let next = Math.ceil((current + 4) / 10) * 10;
                if(next + 10 <= pages) {
                    items.push(me.getDots());
                    items.push(me.getLink(next));
                }

                //add last page
                if(current !== pages) {
                    if(current <= pages - 4) {
                        items.push(me.getDots());
                    }
                    items.push(me.getLink(pages));
                }
            }

            //add next button
            if(current < pages) {
                items.push(me.getLink(current + 1, '>'));
            } else {
                items.push(me.getEndNav('>'));
            }
        }

        return items;
    },

    loadPage: function(page) {
        let me = this,
            store = me.store;

        store.loadPage(page);
    },

    getLink: function(page, text) {
        let me = this,
            store = me.store;

        if(store.currentPage === page) {
            return this.getLabel({
                html: `<span class="selected">${page}</span>`
            });
        } else {
            return this.getLabel({
                html: `<a href="#" onclick="return false;">${text || page}</a>`,
                listeners: {
                    click: {
                        element: 'el',
                        fn: () => { me.loadPage(page); }
                    }
                }
            });
        }
    },

    getDots: function() {
        return this.getLabel({
            html: '...'
        });
    },

    getEndNav: function(text) {
        return this.getLabel({
            html: `<span class="end-nav">${text}</span>`
        });
    },

    getLabel: function(config) {
        config.cls = 'label';
        return Ext.create('Ext.form.Label', config);
    }
});
