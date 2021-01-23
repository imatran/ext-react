import React from 'react';
import { connect } from 'react-redux';
import { ExtButton, ExtContainer, ExtTextField } from 'lib/ext-components';
import { updateName } from '../actions';

const ConnectedProducer2 = props => {
    const [input, setInput] = React.useState();

    const onInputChange = (field, value) => {
        setInput(value);
    };

    const onInputSubmit = () => {
        props.updateName(input);
        setInput(null);
    };

    // console.log('Producer2');
    return(
        <ExtContainer layout='hbox'>
            <ExtContainer flex={1}>
                <ExtButton
                    text='Change Name'
                    handler={onInputSubmit}
                    disabled={!input}
                />
            </ExtContainer>

            <ExtTextField
                flex={1}
                value={input}
                onChange={onInputChange}
            />
        </ExtContainer>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => { dispatch(updateName(name)); },
    };
};

export const Producer2 = connect(null, mapDispatchToProps)(ConnectedProducer2);