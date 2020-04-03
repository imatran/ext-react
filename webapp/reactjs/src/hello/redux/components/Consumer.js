import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'lib/modules';
import { Hello1 } from 'src/hello/fragments/Hello1';
import { Hello2 } from 'src/hello/fragments/Hello2';
import { Hello3 } from 'src/hello/fragments/Hello3';

const ConnectedConsumer = props => {
    // console.log('Consumer');

    return(
        <>
            <Hello1 helloName={props.helloName}/>

            <Container>
                <Hello2 helloName={props.helloName}/>
                <Hello3 helloName={props.helloName}/>
            </Container>

            <div className='spacer'/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        helloName: state.helloName
    };
};

export const Consumer = connect(mapStateToProps)(ConnectedConsumer);