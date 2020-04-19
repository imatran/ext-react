/**
 * Created by atran on 2018-06-12.
 */
Ext.define('React.widgets.ClearTextField', {
    extend: 'Ext.form.field.Text',
    xtype: 'cleartextfield',

    initComponent: function() {
        const me = this;

        Ext.apply(this, {
            listeners: {
                change: this.change,
                scope: this
            }
        });

        me.setTriggers({
            clear: {
                cls: 'x-fa fa-times light-icon',
                hidden: true,
                handler: this.clear,
                scope: this
            }
        });

        me.callParent(arguments);
    },

    change: function(field, value) {
        const me = this,
              clearbtn = me.getTrigger('clear');

        clearbtn && (!Ext.isEmpty(value) ? clearbtn.show() : clearbtn.hide());
    },

    clear: function() {
        const me = this,
              clearbtn = me.getTrigger('clear');

        me.setValue('');
        clearbtn && clearbtn.hide();
        me.fireEvent('cleartriggerclick');
    }
});