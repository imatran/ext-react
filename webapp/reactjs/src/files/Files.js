import React from 'react';
import { Button, Fill, Toolbar, Tree, TreeColumn } from 'lib/modules';
import { Store } from './Store';

Ext.require([
    'Ext.grid.plugin.CellEditing'
]);

export class Files extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disableSave: true
        };

        this.store = Store.create({
            listeners: {
                datachanged: (store) => {
                    this.setState({
                        disableSave: store.getModifiedRecords().length === 0
                    });
                }
            }
        });
    }

    render() {

        const panelProps = {
            height: this.props.height,
            rootVisible: false,
            hideHeaders: true,
            plugins: 'cellediting'
        };

        return(
            <>
                <Tree {...panelProps}
                      store={this.store}
                      onBeforeEdit={this.onBeforeEdit.bind(this)}
                >
                    <TreeColumn
                        dataIndex={'name'}
                        flex={1}
                        editor={'textfield'}
                    />

                    <Toolbar dock='bottom' ui='footer'
                        hidden={this.state.disableSave}
                    >
                        <Fill flex={1} />

                        <Button
                            text={'Save'}
                            handler={this.onSave.bind(this)}
                        />

                        <Button
                            text={'Cancel'}
                            handler={this.onCancel.bind(this)}
                        />
                    </Toolbar>
                </Tree>
            </>
        );

    }

    componentDidMount() {
        this.store.commitChanges();
    }

    onSave() {
        this.store.commitChanges();
        this.store.fireEvent('datachanged', this.store);
    }

    onCancel() {
        this.store.rejectChanges();
        this.store.fireEvent('datachanged', this.store);
    }

    onBeforeEdit(editor, context) {
        return context.record.isLeaf();
    }

}