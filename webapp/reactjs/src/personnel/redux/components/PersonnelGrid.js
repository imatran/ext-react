import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Column, ActionColumn, Button, Toolbar } from 'lib/modules';
import { addRecord, removeRecord, saveChanges, cancelChanges } from '../actions';

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

    const onDelete = (view, rowIdx, colIdx, item, e, record) => {
        props.removeRecord(record);
    };

    const onSave = () => {
        props.saveChanges();
    };

    const onCancel = () => {
        props.cancelChanges();
    };

    return(
        <>
            <Grid {...panelProps}
                  store={props.dataStore.store}
                  onBoxReady={grid => {
                      props.dataStore.ownerGrid = grid;
                  }}
            >

                <Column
                    text={'Name'}
                    dataIndex={'name'}
                    flex={1}
                    editor={'textfield'}
                />

                <Column
                    text={'Phone'}
                    dataIndex={'phone'}
                    flex={1.5}
                />

                <Column
                    text={'Email'}
                    dataIndex={'email'}
                    flex={1.5}
                />

                <ActionColumn
                    iconCls={'x-fa fa-trash'}
                    width={25}
                    menuDisabled={true}
                    hideable={false}
                    handler={onDelete}
                />

                <Toolbar dock='bottom' ui='footer'>
                    <Button
                        text={'Add'}
                        handler={onAdd}
                    />

                    <Container
                        layout={{type: 'hbox', pack: 'center'}}
                        flex={1}
                    >
                        <div style={{fontSize: '9px'}}>Rendered by React/Redux</div>
                    </Container>

                    <Button
                        text={'Save'}
                        handler={onSave}
                        disabled={props.disableSave}
                    />

                    <Button
                        text={'Cancel'}
                        handler={onCancel}
                    />
                </Toolbar>

            </Grid>
        </>
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
        cancelChanges: () => { dispatch(cancelChanges()); }
    };
};

export const PersonnelGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedPersonnelGrid);