import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField } from 'lib/modules';
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
        <Container layout='hbox'>
            <Container flex={1}>
                <Button
                    text='Change Name'
                    handler={onInputSubmit}
                    disabled={!input}
                />
            </Container>

            <TextField
                flex={1}
                value={input}
                onChange={onInputChange}
            />
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => { dispatch(updateName(name)); },
    };
};

export const Producer2 = connect(null, mapDispatchToProps)(ConnectedProducer2);