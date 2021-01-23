import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ExtContainer, ExtLabel, ExtTextField } from 'lib/ext-components';
import { updateName, resetBadName } from '../actions';
import { NotificationManager } from 'react-notifications';

const ConnectedProducer1 = props => {
    useEffect(() => {
        if(props.badName) {
            NotificationManager.error(`Bad name: ${props.badName}`, null, 0);
            props.resetBadName();
        }
    });

    const onNameChange = (field, value) => {
        props.updateName(value);
    };

    // console.log('Producer1');
    return(
        <>
            <ExtContainer layout='hbox'>
                <ExtLabel
                    flex={1}
                    text='Change Name:'
                />

                <ExtTextField
                    flex={1}
                    onChange={onNameChange}
                />
            </ExtContainer>

            <div className='spacer'/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        badName: state.badName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => { dispatch(updateName(name)); },
        resetBadName: (name) => { dispatch(resetBadName(name)); }
    };
};

export const Producer1 = connect(mapStateToProps, mapDispatchToProps)(ConnectedProducer1);
