import React from 'react';
import { ExtContainer, ExtGridPanel, ExtGridColumn, ExtActionColumn, ExtButton, ExtToolbar, ExtComboBox, ExtNumberPaging, ExtTextField } from 'lib/ext-components';
import { DataStore } from './DataStore';
import { AgeGroups } from './AgeGroups';

Ext.require([
    'Ext.grid.plugin.CellEditing'
]);

export class Personnel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disableSave: true
        };

        this.dataStore = new DataStore();
        this.ageGroups = new AgeGroups();
    }

    render() {
        const panelProps = {
            height: this.props.height,
            emptyText: '<div style="text-align: center;"><i>No data to display.</i></div>',
            bufferedRenderer: false,
            plugins: 'cellediting'
        };

        return(
            <ExtGridPanel {...panelProps}
                          store={this.dataStore.pagedStore}
                          onBoxReady={this.onGridReady.bind(this)}
            >

                <ExtGridColumn
                    text='Name'
                    dataIndex='name'
                    flex={1.2}
                    editor={
                        <ExtTextField
                            allowBlank={false}
                        />
                    }
                />

                <ExtGridColumn
                    text='Age'
                    dataIndex='age'
                    flex={1}
                    editor={
                        <ExtComboBox
                            store={this.ageGroups.store}
                            displayField='value'
                            editable={false}
                            onSelect={(field) => { field.blur(); }}
                        />
                    }
                />

                <ExtGridColumn
                    text='Phone'
                    dataIndex='phone'
                    flex={1.5}
                />

                <ExtGridColumn
                    text='Email'
                    dataIndex='email'
                    flex={2}
                />

                <ExtActionColumn
                    iconCls='x-fa fa-trash'
                    tdCls='rollover-action-col'
                    width={25}
                    menuDisabled={true}
                    hideable={false}
                    handler={this.onRemove.bind(this)}
                />

                <ExtToolbar
                    dock='bottom'
                    ui='footer'
                    padding='6 0 0 6'
                >
                    <ExtButton
                        text='Add'
                        handler={this.onAdd.bind(this)}
                    />

                    <ExtContainer
                        layout={{type: 'hbox', pack: 'center'}}
                        flex={1}
                    >
                            <ExtNumberPaging
                                style={{lineHeight: '32px'}}
                                store={this.dataStore.pagedStore}
                            />
                    </ExtContainer>

                    <ExtButton
                        text='Save'
                        handler={this.onSave.bind(this)}
                        disabled={this.state.disableSave}
                    />

                    <ExtButton
                        text='Cancel'
                        handler={this.onCancel.bind(this)}
                    />
                </ExtToolbar>

            </ExtGridPanel>
        );
    }

    onGridReady(grid) {
        this.dataStore.ownerGrid = grid;
        grid.store.on('update', this.onDataChanged, this);
    }

    onDataChanged() {
        const disableSave = !this.dataStore.dirty();
        if(this.state.disableSave !== disableSave) {
            this.setState({ disableSave: disableSave });
        }
    }

    onAdd() {
        this.dataStore.add();
        this.onDataChanged();
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

}
