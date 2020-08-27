import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Column, ActionColumn, Button, Toolbar, TextField } from 'lib/ext-components';
import { addRecord, removeRecord, saveChanges, cancelChanges, dataChanged } from '../actions';

Ext.require([
    'Ext.grid.plugin.CellEditing'
]);

const ConnectedPersonnelGrid = props => {
    const panelProps = {
        height: props.height,
        emptyText: '<div style="text-align: center;"><i>No data to display.</i></div>',
        bufferedRenderer: false,
        plugins: 'cellediting'
    };

    const onAdd = () => {
        props.addRecord();
    };

    const onRemove = (view, rowIdx, colIdx, item, e, record) => {
        props.removeRecord(record);
    };

    const onSave = () => {
        props.saveChanges();
    };

    const onCancel = () => {
        props.cancelChanges();
    };

    const onGridReady = (grid) => {
        props.dataStore.ownerGrid = grid;
        grid.store.on('update', props.dataChanged);
    };

    return(
        <Grid {...panelProps}
              store={props.dataStore.store}
              onBoxReady={onGridReady}
        >

            <Column
                text='Name'
                dataIndex='name'
                flex={1}
                editor={
                    <TextField
                        allowBlank={false}
                    />
                }
            />

            <Column
                text='Phone'
                dataIndex='phone'
                flex={1.5}
            />

            <Column
                text='Email'
                dataIndex='email'
                flex={1.5}
            />

            <ActionColumn
                iconCls='x-fa fa-trash'
                tdCls='rollover-action-col'
                width={25}
                menuDisabled={true}
                hideable={false}
                handler={onRemove}
            />

            <Toolbar dock='bottom' ui='footer' padding='6 0 0 6'>
                <Button
                    text='Add'
                    handler={onAdd}
                />

                <Container
                    layout={{type: 'hbox', pack: 'center'}}
                    flex={1}
                >
                    <div style={{fontSize: '9px'}}>Rendered by React/Redux</div>
                </Container>

                <Button
                    text='Save'
                    handler={onSave}
                    disabled={props.disableSave}
                />

                <Button
                    text='Cancel'
                    handler={onCancel}
                />
            </Toolbar>

        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        dataStore: state.dataStore,
        disableSave: state.disableSave
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRecord: (record) => { dispatch(addRecord(record)); },
        removeRecord: (record) => { dispatch(removeRecord(record)); },
        saveChanges: () => { dispatch(saveChanges()); },
        cancelChanges: () => { dispatch(cancelChanges()); },
        dataChanged: () => { setTimeout(() => { dispatch(dataChanged()) }, 1); }
    };
};

export const PersonnelGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedPersonnelGrid);
