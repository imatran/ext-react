/**
 * Created by atran on 2017-04-03.
 */
Ext.define('React.overrides.data.TreeStore', {
    override: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.Model'
    ],

    /**
     * @override
     */
    rejectChanges: function() {
        this.callParent(arguments);

        if(this.previousRoot) {
            let tree = this.ownerTree,
                selected = tree && tree.getSelection()[0],
                expanded = [];

            //keep track of expanded nodes
            this.getRoot().cascade((node) => {
                node.isExpanded() && expanded.push(node);
            });

            //restore previous root
            this.setRoot(this.previousRoot);
            delete this.previousRoot;
            this.commitChanges();

            //restore previous selected node
            if(selected) {
                selected = this.findChildByPathName(selected);
                tree.setSelection(selected);
            }

            //restore previous expanded nodes
            for(let node of expanded) {
                node = this.findChildByPathName(node);
                node && node.expand();
            }
        }

        if(this.getRoot().isVisible()) {
            this.getRoot().expand();
        }
    },

    /**
     * @override
     */
    commitChanges: function() {
        this.updateRoot(this.getRoot());
        this.callParent(arguments);
    },

    /**
     * @override
     */
    updateRoot: function(newRoot, oldRoot) {
        this.callParent(arguments);

        if(!newRoot) {
            delete this.previousRoot;
        } else {
            this.previousRoot = this.getRoot().copy(this.getRoot().id, this.getRoot().session, true);
        }
    },

    /**
     * Find child node by path name property.
     *
     * @param node
     * @returns {*|Ext.data.NodeInterface}
     */
    findChildByPathName: function(node) {
        if(node instanceof Ext.data.Model) {
            return this.getRoot().findChildBy(function(item) {
                return item.getPath('name') === node.getPath('name');
            }, null, true);
        } else {
            return node;
        }
    }

});