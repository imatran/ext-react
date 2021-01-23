import React from 'react';
import { ExtButton, ExtFill, ExtToolbar, ExtTreePanel, ExtTreeColumn, ExtTextField, ExtActionColumn } from 'lib/ext-components';
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
            <ExtTreePanel {...panelProps}
                          store={this.dataStore.store}
                          onBoxReady={this.onGridReady.bind(this)}
                          onBeforeEdit={this.onBeforeEdit.bind(this)}
            >
                <ExtTreeColumn
                    dataIndex='name'
                    flex={1}
                    editor={
                        <ExtTextField
                            allowBlank={false}
                        />
                    }
                />

                <ExtActionColumn
                    iconCls='x-fa fa-trash'
                    tdCls='rollover-action-col'
                    width={25}
                    menuDisabled={true}
                    hideable={false}
                    handler={this.onRemove.bind(this)}
                />

                <ExtToolbar dock='bottom' ui='footer' padding='6 0 0 6'
                            hidden={this.state.disableSave}
                >
                    <ExtFill flex={1} />

                    <ExtButton
                        text='Save'
                        handler={this.onSave.bind(this)}
                    />

                    <ExtButton
                        text='Cancel'
                        handler={this.onCancel.bind(this)}
                    />
                </ExtToolbar>
            </ExtTreePanel>
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
