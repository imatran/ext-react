/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'React.Application',

    name: 'React',

    requires: [
        'React.ExtRequires'
    ],

    // The name of the initial view to create.
    mainView: 'React.view.main.Main'
});
