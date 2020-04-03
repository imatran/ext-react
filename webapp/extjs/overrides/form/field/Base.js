/**
 * Created by atran on 2020-03-26.
 */
Ext.define('React.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',

    listeners: {
        afterrender: function(field) {
            field.inputEl.set({
                autocomplete: 'disabled'
            });
        }
    }
});