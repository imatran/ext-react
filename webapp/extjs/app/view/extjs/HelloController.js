/**
 * Created by atran on 2020-04-01.
 */
Ext.define('React.view.extjs.HelloController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hello',

    /**
     * Called when the view is created
     */
    init: function() {
        this.callParent(arguments);
    },

    onNameChange: function(field, value) {
        let vm = this.getViewModel();

        vm.set('helloName', value);
        vm.set('comboValue', value);
    },

    onInputChange: function(field, value) {
        let vm = this.getViewModel();

        vm.set('helloInput', value);
    },

    onInputSubmit: function() {
        let vm = this.getViewModel(),
            helloInput = vm.get('helloInput');

        vm.set('helloName', helloInput);
        vm.set('comboValue', helloInput);
        vm.set('helloInput', null);
    },

    onHideLabel: function() {
        let vm = this.getViewModel(),
            value = vm.get('showLabel');

        vm.set('showLabel', !value);
    },

    onBoldLabel: function() {
        let vm = this.getViewModel(),
            value = vm.get('boldLabel');

        vm.set('boldLabel', !value);
    },

    onComboChange: function(field, value) {
        let vm = this.getViewModel();

        vm.set('comboValue', value);
    }
});