import React from 'react';
import { Container, Grid, Column, ActionColumn, Button, Toolbar, Combobox, NumberPaging } from 'lib/modules';
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
            <>
                <Grid {...panelProps}
                      store={this.dataStore.pagedStore}
                      onBoxReady={this.onGridReady.bind(this)}
                >

                    <Column
                        text={'Name'}
                        dataIndex={'name'}
                        flex={1.2}
                        editor={'textfield'}
                    />

                    <Column
                        text={'Age'}
                        dataIndex={'age'}
                        flex={1}
                        editor={
                            <Combobox
                                store={this.ageGroups.store}
                                displayField={'value'}
                                editable={false}
                            />
                        }
                    />

                    <Column
                        text={'Phone'}
                        dataIndex={'phone'}
                        flex={1.5}
                    />

                    <Column
                        text={'Email'}
                        dataIndex={'email'}
                        flex={2}
                    />

                    <ActionColumn
                        iconCls={'x-fa fa-trash'}
                        width={25}
                        menuDisabled={true}
                        hideable={false}
                        handler={this.onDelete.bind(this)}
                    />

                    <Toolbar dock='bottom' ui='footer'>
                        <Button
                            text={'Add'}
                            handler={this.onAdd.bind(this)}
                        />

                        <Container
                            layout={{type: 'hbox', pack: 'center'}}
                            flex={1}
                        >
                                <NumberPaging
                                    store={this.dataStore.pagedStore}
                                />
                        </Container>

                        <Button
                            text={'Save'}
                            handler={this.onSave.bind(this)}
                            disabled={this.state.disableSave}
                        />

                        <Button
                            text={'Cancel'}
                            handler={this.onCancel.bind(this)}
                        />
                    </Toolbar>

                </Grid>
            </>
        );

    }

    onGridReady(grid) {
        this.grid = grid;

        grid.store.on('datachanged', this.onDataChanged, this);
        grid.store.on('commit', this.onDataChanged, this);
    }

    onDataChanged() {
        const disableSave = !this.dataStore.dirty();
        if(this.state.disableSave !== disableSave) {
            this.setState({ disableSave: disableSave });
        }
    }

    selectLastRecord() {
        const record = this.dataStore.last();
        record && this.grid.ensureVisible(record, {select: true, animate: false});
        this.grid.getView().refresh();
    }

    onAdd() {
        this.dataStore.add();
        this.selectLastRecord();
    }

    onDelete(view, rowIdx, colIdx, item, e, record) {
        record.drop();
    }

    onSave() {
        this.dataStore.save();
        this.selectLastRecord();
    }

    onCancel() {
        this.dataStore.cancel();
        this.selectLastRecord();
    }

}
