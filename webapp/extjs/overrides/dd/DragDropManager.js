/**
 * Created by atran on 2020-10-10.
 */
Ext.define('React.overrides.dd.DragDropManager', {
    override: 'Ext.dd.DragDropManager',

    /**
     * Override to prevent text selection on DD.
     * @param e
     */
    stopEvent: function(e) {
        if(this.stopPropagation) {
            e.stopPropagation();
        }

        if(this.preventDefault) {
            e.preventDefault();
        }
    }
});