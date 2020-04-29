import React from 'react';
import { Button, Fill, Toolbar, Tree, TreeColumn, TextField, ActionColumn } from 'lib/modules';
import { DataStore } from './DataStore';

Ext.require([
    'Ext.grid.plugin.CellEditing'
]);

export class Files extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disableSave: true
        };

        this.dataStore = new DataStore();
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
                      store={this.dataStore.store}
                      onBoxReady={this.onGridReady.bind(this)}
                      onBeforeEdit={this.onBeforeEdit.bind(this)}
                >
                    <TreeColumn
                        dataIndex='name'
                        flex={1}
                        editor={
                            <TextField
                                allowBlank={false}
                            />
                        }
                    />

                    <ActionColumn
                        iconCls='x-fa fa-trash'
                        tdCls='rollover-action-col'
                        width={25}
                        menuDisabled={true}
                        hideable={false}
                        handler={this.onRemove.bind(this)}
                    />

                    <Toolbar dock='bottom' ui='footer' padding='6 0 0 6'
                        hidden={this.state.disableSave}
                    >
                        <Fill flex={1} />

                        <Button
                            text='Save'
                            handler={this.onSave.bind(this)}
                        />

                        <Button
                            text='Cancel'
                            handler={this.onCancel.bind(this)}
                        />
                    </Toolbar>
                </Tree>
            </>
        );
    }

    onGridReady(grid) {
        grid.store.on('update', this.onDataChanged, this);
    }

    onDataChanged() {
        const disableSave = !this.dataStore.dirty();
        if(this.state.disableSave !== disableSave) {
            this.setState({ disableSave: disableSave });
        }
    }

    onRemove(view, rowIdx, colIdx, item, e, record) {
        this.dataStore.remove(record);
        this.onDataChanged();
    }

    onSave() {
        this.dataStore.save();
        this.onDataChanged();
    }

    onCancel() {
        this.dataStore.cancel();
        this.onDataChanged();
    }

    onBeforeEdit(editor, context) {
        return context.record.isLeaf();
    }

}
